import {RequestHandler, Router} from "express"
import {controllers} from "../../controllers"
import { authenticate } from "../../middlewares/auth.middleware"
import { TicketCreationRequest } from "../../dto/ticket"
import { AuthRequest } from "../../dto/user"

const {ticketController} = controllers

const ticketRouter = Router()

ticketRouter.post("/create",authenticate as RequestHandler, async (req, res) => {
  await ticketController.createTicket(req as TicketCreationRequest, res)
})
ticketRouter.get("/",authenticate as RequestHandler, async (req, res) => {
  await ticketController.getTickets(req as AuthRequest, res)
})

export default ticketRouter