import { repositories } from "../repositories";
import { UserService } from "./user/user.service";


const { userRepository } = repositories

export const services = {
  userService: new UserService(userRepository)
}