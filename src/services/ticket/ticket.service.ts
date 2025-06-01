import { JwtPayload } from "jsonwebtoken";
import { TicketCreationRequestBody } from "../../dto/ticket";
import { TicketRepository } from "../../repositories/ticket/ticket.repository";
import { Schema } from "mongoose";
import { inngest } from "../../inngest/client";

export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) { }

  async createTicket(data: TicketCreationRequestBody, user: string | JwtPayload | {
    email: string;
    role: string;
    _id: Schema.Types.ObjectId
  }) {
    try {
      const { title, description } = data;

      if (!title || !description) {
        throw new Error("Title and description are required");
      }

      const newTicket =  await this.ticketRepository.createTicket(data, user);

      await inngest.send({
        name: "ticket/created",
        data: {
          ticketId: newTicket?._id.toString(),
          title,
          description
        }
      })
      return newTicket;

    } catch (error) {
      throw new Error(error)
    }
  }

  async getTickets(userRole: string,userId: Schema.Types.ObjectId) {
    try {
      const tickets = await this.ticketRepository.getTickets(userRole,userId);
      return tickets;
    } catch (error) {
      throw new Error(error)
    }
  }
}