import { JwtPayload } from "jsonwebtoken";
import { TicketCreationRequestBody } from "../../dto/ticket";
import { Ticket } from "../../models/Ticket";
import { Schema } from "mongoose";
import { USER } from "../../utils/constant";

export class TicketRepository {
  constructor() { }

  async createTicket(data: TicketCreationRequestBody, user: string | JwtPayload | {
    email: string;
    role: string;
    _id: Schema.Types.ObjectId
  }) {
    const ticket = await Ticket.create({
      title: data.title,
      description: data.description,
      created_by: user?.toString(),
    })
    return ticket;
  }


  async getTickets(userRole: string,userId: Schema.Types.ObjectId) {
    let tickets: any[] = [];
    if(userRole !== USER){
      tickets = await Ticket.find()
      .populate("assigned_to",["email"])
      .populate("created_by",["email"])
      .sort({createdAt: -1});
      return tickets;
    }else{
      tickets = await Ticket.find({created_by: userId})
      .select("title description status created_by createdAt")
      .sort({createdAt: -1});
    }
    return tickets;
  }
}