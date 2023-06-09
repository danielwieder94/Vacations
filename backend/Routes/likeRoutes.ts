import express, { NextFunction, Request, Response } from "express";
import User from "../Models/User";
import Vacation from "../Models/Vacation";
import likeLogic from "../Logic/likeLogic";

const likeRouter = express.Router();

//add / remove like
likeRouter.post(
  "/addLike",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = +request.body.userId;
    const vacationId = +request.body.vacationId;
    try {
      const like = await likeLogic.toggleLike(userId, vacationId);
      response.status(200).json({
        like: like,
        message: "Like added successfully to vacation",
      });
    } catch (error) {
      response.status(500).json({ message: "Something went wrong" });
    }
  }
);

//get likes by user
likeRouter.post(
  "/getLikesByUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = +request.body.userId;
    try {
      const likes = await likeLogic.getLikesByUser(userId);
      response.status(200).json({
        likes: likes,
        message: "Likes retrieved successfully",
      });
      console.log("likes:", likes);
    } catch (error) {
      response.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default likeRouter;
