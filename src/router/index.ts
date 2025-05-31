import {Router} from "express"
import UserRouter from "./user/user.router"

const router = Router()
router.use("/users",UserRouter)

export default router