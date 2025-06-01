import { TicketRepository } from "./ticket/ticket.repository";
import { UserRepository } from "./user/user.repository";

export const repositories = {
  userRepository: new UserRepository(),
  ticketRepository: new TicketRepository()
}