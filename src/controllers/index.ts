import { services } from "../services";
import { UserController } from "./user/user.controller";

const { userService } = services

export const controllers = {
  userController: new UserController(userService)
}