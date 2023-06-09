import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import VacationLogic from "../Logic/VacationLogic";
import Vacation from "../Models/Vacation";
import upload from "../Logic/FileUpload";
import path from "path";
import multer from "multer";

const router = express.Router();

//router.post
router.post(
  "/add",
  async (request: Request, response: Response, next: NextFunction) => {
    const newVacation: Vacation = await VacationLogic.addVacation(request.body);
    response.status(200).json({
      newVacation: newVacation,
      vacationId: newVacation.id,
      message: "Vacation added successfully",
    });
  }
);
//get all vacations
router.get(
  "/list",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await VacationLogic.getAllVacations());
    return response;
  }
);

//get vacation by id
router.get(
  "/list/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationId = +request.params.id;
    const vacation = await VacationLogic.getVacationById(vacationId);
    response.status(200).json(vacation);
    return response;
  }
);

//update vacation
router.put(
  "/update/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const updatedVacation: Vacation = await VacationLogic.updateVacation(
      request.body
    );
    response.status(200).json({
      updatedVacation: updatedVacation,
      message: "Vacation updated successfully",
    });
  }
);

//router.delete
router.delete(
  "/delete/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationId = +request.params.id;
    await VacationLogic.deleteVacation(vacationId);
    response.status(200).json({ message: "Vacation deleted successfully" });
  }
);

router.post(
  "/:id/upload",
  upload.single("image"),
  (request: Request, response: Response, err: any) => {
    response.send("image uploaded successfully");
  }
);

//format date to local timezone
const formatDate = (date: Date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB");
  return formattedDate;
};

export default router;
