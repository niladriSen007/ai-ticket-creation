import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config"
import { AuthRequest } from '../dto/user';

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, JWT_SECRET as string);
    if (!decoded) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    req.user = JSON.parse(JSON.stringify(decoded));
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
} 