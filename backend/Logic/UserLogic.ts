import dal_mysql from "../Utils/dal_mysql";
import { Request, Response, response } from "express";
import { OkPacket } from "mysql";
import User from "../Models/User";
import execute from "../Utils/dal_mysql";
import bcrypt from "bcrypt";

//create userTable
const createUsersTable = async () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS vacations.users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN NOT NULL DEFAULT false,
        vacations INT NOT NULL DEFAULT 0
        )`;
  const result: OkPacket = await dal_mysql.execute(sql);
};

//create likesTable
const createLikesTable = async () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS vacations.likes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vacationId INT NOT NULL,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (vacationId) REFERENCES vacations_list(id),
        UNIQUE KEY (userId, vacationId)
        )`;
  const result: OkPacket = await dal_mysql.execute(sql);
};

//Register user
export const registerUser = async (user: User) => {
  //check if email exists
  try {
    const emailExists = await getUserByEmail(user.email);
    if (emailExists) {
      throw new Error("Email already exists");
    }
    //protect user's password - using bcrypt
    const hashedPassword: string = await bcrypt.hash(user.password, 10);
    //using ? ? ? ? placeholders to prevent SQL injection, adding maintainability and readability
    const insertUserSql = `INSERT INTO vacations.users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;
    //Insert the new user to the DB
    const insertUserResult: OkPacket = await dal_mysql.execute(insertUserSql, [
      user.firstName,
      user.lastName,
      user.email,
      hashedPassword,
    ]);
    console.log("insertUserResult: ", insertUserResult);
    //Return the new user
    const newUser: User = {
      id: insertUserResult.insertId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "", //don't return the password to the client
      isAdmin: false,
      vacations: [],
    };
    return newUser;
  } catch (error: any) {
    console.error("Error occured in registerUser function: ", error);
    throw new Error("Failed to register user");
  }
};

//login
const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  console.log("loginUser email: ", email);
  console.log("loginUser password: ", password);
  if (!user) {
    response.statusCode = 401;
    throw new Error("Invalid email or password");
  }
  // check if password is correct
  try {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("isPasswordCorrect: ", isPasswordCorrect);
    if (!isPasswordCorrect) {
      response.statusCode = 401;
      throw new Error("Invalid email or password");
    }
    //return the user
    return user;
  } catch (error: any) {
    response.statusCode = 401;
    console.error("Error occured in loginUser function: ", error);
    throw new Error("Failed to login user");
  }
};

//get user by email - for login / register
const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const sql = `SELECT * FROM vacations.users WHERE email = ?`;
    // synax [userData] = await dal_mysql......, is the same as - const result = await dal_mysql....
    //and then const userData = result[0]
    const [userData] = await dal_mysql.execute(sql, [email]);
    console.log("getUserByEmail:", userData);
    if (!userData) {
      return null;
    }
    return userData ? { ...userData } : null;
  } catch (error: any) {
    console.error("Error occured in getUserByEmail function: ", error);
    throw new Error("Invalid email: " + email);
  }
};

export default {
  createUsersTable,
  createLikesTable,
  registerUser,
  getUserByEmail,
  loginUser,
};
