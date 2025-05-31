import { RequestHandler, Router } from "express"
import { controllers } from "../../controllers";
import { UserLoginRequest, UserSignupRequest, UserUpdateRequest } from "../../dto/user";
import { authenticate } from "../../middlewares/auth.middleware";

const { userController } = controllers

const userRouter = Router()

userRouter.post("/signup", async (req, res) => {
  await userController.createUser(req as UserSignupRequest, res)
})
userRouter.post("/login", async (req, res) => {
  await userController.loginUser(req as UserLoginRequest, res)
})
userRouter.post("/logout", authenticate as RequestHandler, async (req, res) => {
  await userController.logout(req, res)
})

userRouter.put("/update", authenticate as RequestHandler, async (req, res) => {
  await userController.updateUser(req as UserUpdateRequest, res)
})

export default userRouter