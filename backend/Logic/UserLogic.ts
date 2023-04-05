import dal_mysql from "../Utils/dal_mysql";
import { Request, Response } from "express";
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
  const emailExists = await getUserByEmail(user.email);
  if (emailExists) {
    throw new Error("Email already exists");
  }
  //protect user's password - using bcrypt
  const hashedPassword: string = await bcrypt.hash(user.password, 10);
  //using ? ? ? ? placeholders to prevent SQL injection, adding maintainability and readability
  const insertUserSql = `INSERT INTO vacations.users (firstName, lastName, email, password, isAdmin) VALUES (?, ?, ?, ?, ?)`;
  console.log(
    insertUserSql,
    user.firstName,
    user.lastName,
    user.email,
    hashedPassword,
    user.isAdmin
  );
  //Insert the new user to the DB
  const insertUserResult: OkPacket = await dal_mysql.execute(insertUserSql, [
    user.firstName,
    user.lastName,
    user.email,
    hashedPassword,
    user.isAdmin,
  ]);
  //Return the new user
  const newUser = {
    id: insertUserResult.insertId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "", //don't return the password to the client
    isAdmin: false,
    vacations: [],
  };
};

//get user by email - for login / register
const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await dal_mysql.execute(sql, [email]);
    return rows[0] || null;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};

export default {
  createUsersTable,
  createLikesTable,
  registerUser,
  getUserByEmail,
};
