import {Router} from "express"
import UserRouter from "./user/user.router"
import TicketRouter from "./ticket/ticket.router"

const router = Router()
router.use("/users",UserRouter)
router.use("/tickets",TicketRouter)

export default router