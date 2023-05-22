import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../Utils/auth";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Access denied, missing token" });
  }
  try {
    const decodedToken = verifyAuthToken(token);
    const { isAdmin } = decodedToken;
    res.locals.jwtPayload = decodedToken;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied, user must have admin permissions" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid token" });
  }
};
