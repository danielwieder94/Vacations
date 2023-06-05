import express, { NextFunction, Request, Response } from "express";
import User from "../Models/User";
import Vacation from "../Models/Vacation";
import likeLogic from "../Logic/likeLogic";

const likeRouter = express.Router();

//add like
likeRouter.post(
  "/addLike",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = +request.body.userId;
    const vacationId = +request.body.vacationId;
    try {
      const like = await likeLogic.addLike(userId, vacationId);
      response.status(200).json({
        like: like,
        message: "Like added successfully",
      });
    } catch (error) {
      response.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default likeRouter;
