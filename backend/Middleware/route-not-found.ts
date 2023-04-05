import { Request, Response, NextFunction } from "express";
import { RouteNotFoundError } from "../Models/client-errors";

const ErrorHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  throw new RouteNotFoundError();
};

export default ErrorHandler;
