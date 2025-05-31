import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserLoginRequest, UserSignupRequest } from "../../dto/user";
import { UserService } from "../../services/user/user.service";

export class UserController {
  constructor(private readonly userService: UserService) { }

  public async createUser(req: UserSignupRequest, res: Response) {
    try {
      const token: Promise<string> = this.userService.createUser(req?.body)
      res.status(StatusCodes?.CREATED).json(token)
    } catch (error) {
      res.status(StatusCodes?.BAD_REQUEST).json(error)
    }
  }

  public async loginUser(req: UserLoginRequest, res: Response) {
    try {
      const token = this.userService.loginUser(req?.body)
      res.status(StatusCodes?.OK).json(token)
    } catch (error) {
      res.status(StatusCodes?.UNAUTHORIZED).json(error)
    }
  }
}