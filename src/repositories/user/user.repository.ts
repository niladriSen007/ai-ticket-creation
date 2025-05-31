import { UserLoginRequestBody, UserSignupRequestBody } from "../../dto/user";
import { comparePassword } from "../../helpers";
import { User } from "../../models/User";

export class UserRepository {
  constructor() { }

  public async createUser(data: UserSignupRequestBody) {
    const { email, password, skills = [] } = data;
    try {
      const userExistence = await User.findOne({ email });
      if (userExistence) {
        throw new Error("User already exists");
      }
      return await User.create({ email, password, skills })
    } catch (error) {

    }
  }


  public async loginUser(data: UserLoginRequestBody) {
    const { email, password } = data;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      if (!comparePassword(password, user.password)) {
        throw new Error("Invalid credentials");
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }
}