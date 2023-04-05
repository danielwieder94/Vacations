import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import { OkPacket } from "mysql";
import dal_mysql from "../Utils/dal_mysql";
import bcrypt from "bcrypt";
import User from "../Models/User";
import { registerUser } from "../Logic/UserLogic";
import UserLogic from "../Logic/UserLogic";

const userRoutes = express.Router();
//email validation in UserLogic.ts
userRoutes.post(
  "/register",
  async (request: Request, response: Response, NextFunction) => {
    try {
      //validate user's input
      const { firstName, lastName, email, password } = request.body;
      if (!firstName || !lastName || !email || !password) {
        return response
          .status(400)
          .json({ message: "Missing required fields" });
      }
      const newUser: User = {
        firstName,
        lastName,
        email,
        password,
        id: 0,
        isAdmin: false,
        vacations: [],
      };
      const registeredUser = await UserLogic.registerUser(newUser);
      response.status(201).json(registeredUser);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal server error" });
    }
  }
);

//login
userRoutes.post(
  "/login",
  async (request: Request, response: Response, NextFunction) => {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        return response
          .status(400)
          .json({ message: "Missing required fields" });
      }
      const emailExists = await UserLogic.getUserByEmail(email);
      if (!emailExists) {
        return response.status(400).json({ message: "Invalid email" });
      }
      //check if password is correct
      const user: User | null = await UserLogic.getUserByEmail(email);
      if (!user) {
        return response.status(400).json({ message: "Invalid email" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return response.status(400).json({ message: "Invalid password" });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Internal server error" });
    }
  }
);

// try {
//     //validate user's input
//     const { email, password } = request.body;
//     if (!email || !password) {
//     return response
//         .status(400)
//         .json({ message: "Missing required fields" });
//     }
//     //check if email exists
//     const emailExists = await checkEmailExists(email);
//     if (!emailExists) {
//     return response.status(400).json({ message: "Invalid email" });
//     }
//     //check if password is correct
//     const user = await getUserByEmail(email);
//     const isPasswordCorrect = await bcrypt.compare(
//     password,
//     user.password
//     );
//     if (!isPasswordCorrect) {
//     return response.status(400).json({ message: "Invalid password" });
//     }
//     //generate token
//     const token = jwt.sign(
//     { id: user.id, isAdmin: user.isAdmin },
//     config.jwtSecret,
//     { expiresIn: "1d" }
//     );
//     //send token to client
//     response.json({ token });
// } catch (error) {
//     console.error(error);
//     response.status(500).json({ message: "Internal server error" });
// }

//get user by email

export default userRoutes;
