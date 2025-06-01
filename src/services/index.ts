import { repositories } from "../repositories";
import { TicketService } from "./ticket/ticket.service";
import { UserService } from "./user/user.service";


const { userRepository, ticketRepository } = repositories

export const services = {
  userService: new UserService(userRepository),
  ticketService: new TicketService(ticketRepository)
}