import dal_mysql from "../Utils/dal_mysql";
import { Request, Response, response } from "express";
import { OkPacket } from "mysql";
import User from "../Models/User";
import bcrypt from "bcrypt";

//create userTable
const createUsersTable = async () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS vacations_db.users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN NOT NULL DEFAULT false,
        likedVacations JSON NULL
        )`;
  const result: OkPacket = await dal_mysql.execute(sql);
};

//create likesTable
const createLikesTable = async () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS vacations_db.likes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vacationId INT NOT NULL,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (vacationId) REFERENCES vacations_list(id) ON DELETE CASCADE,
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
    const insertUserSql = `INSERT INTO vacations_db.users (firstName, lastName, email, password, likedVacations) VALUES (?, ?, ?, ?, ?)`;
    //Insert the new user to the DB
    const insertUserResult: OkPacket = await dal_mysql.execute(insertUserSql, [
      user.firstName,
      user.lastName,
      user.email,
      hashedPassword,
      JSON.stringify([]),
    ]);
    //Return the new user
    const newUser: User = {
      id: insertUserResult.insertId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "", //don't return the password to the client
      isAdmin: false,
      likedVacations: [],
    };
    return newUser;
  } catch (error: any) {
    console.error("Error occured in registerUser function: ", error);
    throw new Error("Failed to register user");
  }
};

//login
export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }
  // check if password is correct
  try {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }
    return user;
  } catch (error: any) {
    console.error("Error occured in loginUser function: ", error);
    throw new Error("Invalid email or password");
  }
};

//get user by email - for login / register
const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const sql = `SELECT * FROM vacations_db.users WHERE email = ?`;
    const [userData] = await dal_mysql.execute(sql, [email]);
    if (!userData) {
      return null;
    }
    return { ...userData, isAdmin: userData.isAdmin };
  } catch (error: any) {
    throw new Error("Invalid email or password");
  }
};

export default {
  createUsersTable,
  createLikesTable,
  registerUser,
  getUserByEmail,
  loginUser,
};
