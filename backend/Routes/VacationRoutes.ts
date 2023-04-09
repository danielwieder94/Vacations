import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import VacationLogic from "../Logic/VacationLogic";
// import { VacationLogic } from "../Logic/VacationLogic";

const router = express.Router();

//router.post
//get all vacations
router.get(
  "/list",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await VacationLogic.getAllVacations());
  }
);

//router.put

//router.delete

export default router;
