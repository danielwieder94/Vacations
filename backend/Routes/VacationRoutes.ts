import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import VacationLogic from "../Logic/VacationLogic";
import Vacation from "../Models/Vacation";
import upload from "../Logic/FileUpload";
import path from "path";

const router = express.Router();

//router.post
const addVacation = router.post(
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
  }
);

//router.put

//router.delete

router.post(
  "/:id/upload",
  upload.single("image"),
  (request: Request, response: Response) => {
    response.send("image uploaded successfully");
  }
);

// router.get("/public/:image", (request: Request, response: Response) => {
//   console.log(request.params.image);
//   const image = request.params.image;
//   response.sendFile(path.join(__dirname, "../public", image));
// });

export default router;
