import { StatusCodes } from "http-status-codes";
import { TicketService } from "../../services/ticket/ticket.service";
import { TicketCreationRequest } from "../../dto/ticket";
import { Response } from "express";
import { AuthRequest } from "../../dto/user";
import { USER } from "../../utils/constant";
import { Schema } from "mongoose";

export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  public async createTicket(req: TicketCreationRequest, res: Response) {
    try {
      const ticket = await this.ticketService.createTicket(req?.body, req?.user)
      res.status(StatusCodes?.CREATED).json({ message: "Ticket created successfully", ticket })
    } catch (error) {
      res.status(StatusCodes?.BAD_REQUEST).json(error)
    }
  }

  public async getTickets(req: AuthRequest, res: Response) {
    try {
      const user = req?.user as { role: string, _id: Schema.Types.ObjectId }
      const tickets = await this.ticketService.getTickets(user?.role,user?._id)
      res.status(StatusCodes?.OK).json({ tickets })
    } catch (error) {
      res.status(StatusCodes?.UNAUTHORIZED).json(error)
    }
  }

 /*  public async getTicket(req: AuthRequest, res: Response) {
    try {
      const user = req?.user as { role: string, _id: Schema.Types.ObjectId }
      const tickets = await this.ticketService.getTickets(user?.role, user?._id)
      res.status(StatusCodes?.OK).json({ tickets })
    } catch (error) {
      res.status(StatusCodes?.UNAUTHORIZED).json(error)
    }
  } */
}