import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";

export interface UserSignupRequestBody {
  email: string,
  password: string,
  skills: string[]
}

export interface UserSignupRequest extends Request {
  body: UserSignupRequestBody
}

export interface UserLoginRequestBody {
  email: string,
  password: string
}

export interface UserLoginRequest extends Request {
  body: UserLoginRequestBody
}

export interface UserUpdateRequestBody {
  email: string,
  role: string,
  skills: string[]
}

export interface UserUpdateRequest extends Request {
  body: UserUpdateRequestBody
}

export interface AuthRequest extends Request {
  user: string | JwtPayload 
}