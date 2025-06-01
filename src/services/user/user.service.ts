import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";
import { AuthRequest, UserLoginRequestBody, UserSignupRequestBody, UserUpdateRequestBody } from "../../dto/user";
import { hashPassword } from "../../helpers";
import { inngest } from "../../inngest/client";
import { UserRepository } from "../../repositories/user/user.repository";
import { ADMIN, USER } from "../../utils/constant";
import { Request } from "express";

export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  public async createUser(data: UserSignupRequestBody): Promise<string> {
    try {
      const { email, password, skills = [] } = data;
      //Hash user password
      const hashedPassword = await hashPassword(password);
      //pass to repo layer for further processing
      const user = await this.userRepository.createUser({ email, password: hashedPassword, skills })

      //Fire ingest event
      await inngest.send({
        name: "user/signup",
        data: {
          email: email
        }
      })

      const token = jwt.sign({ email: email, role: USER,_id : user?._id }, JWT_SECRET, {
        expiresIn: "1d",
      });
      return token;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }


  public async loginUser(data: UserLoginRequestBody) {
    try {
      const { email, password } = data;
      const user = await this.userRepository.loginUser({ email, password })
      const token = jwt.sign({ email: email, role: USER,_id: user?._id }, JWT_SECRET, {
        expiresIn: "1d",
      });
      return { user, token };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  public async logout(token: string) {
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          throw new Error("Invalid token");
        }
        return decoded;
      });
      return true;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }


  async updateUser(data: UserUpdateRequestBody) {
    try {
      const { email, role, skills = [] } = data;
      if (role !== ADMIN) {
        throw new Error("Only admin can update user role")
      }
      //pass to repo layer for further processing
      const user = await this.userRepository.updateUser({ email, role, skills })
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUser(req: AuthRequest) {
    try {
      if ((req?.user as { role: string })?.role !== ADMIN) {
        throw new Error("Only admin can get user")
      }
      const users = await this.userRepository.getUser();
      return users;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

