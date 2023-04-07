import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../Models/User";
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
      console.log("User registered successfully");
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal server error" });
    }
  }
);

//login
userRoutes.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, password } = request.body;
      console.log("email: ", email);
      console.log("password: ", password);
      if (!email || !password) {
        return response
          .status(400)
          .json({ message: "Missing required fields" });
      }
      console.log(
        "Attempting to log in with email:",
        email,
        "and password:",
        password
      );
      const user = await UserLogic.loginUser(email, password);
      response.status(200).json({ message: "Login successful", user });
    } catch (error: any) {
      switch (error.message) {
        case response.status(400):
          return response
            .status(400)
            .json({ message: "Invalid email or password" });
        default:
          response.status(500).json({ message: "Internal server error" });
          next(error);
      }
    }
  }
);

export default userRoutes;
