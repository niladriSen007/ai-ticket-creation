import { UserRepository } from "./user/user.repository";

export const repositories = {
  userRepository: new UserRepository()
}