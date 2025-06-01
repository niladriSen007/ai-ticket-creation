import { services } from "../services";
import { TicketController } from "./ticket/ticket.controller";
import { UserController } from "./user/user.controller";

const { userService,ticketService } = services

export const controllers = {
  userController: new UserController(userService),
  ticketController: new TicketController(ticketService)
}