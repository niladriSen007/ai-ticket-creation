import { Request } from "express";

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