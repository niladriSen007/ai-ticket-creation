import { Ticket } from './../../models/Ticket';
import { Document, Types } from 'mongoose';

// Define the interface for Ticket document
interface ITicket {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: string;
  created_by: Types.ObjectId;
  assigned_to: Types.ObjectId;
  priority: string;
  deadline?: Date;
  helpfulNotes?: string;
  relatedSkills?: string[];
  createdAt: Date;
  updatedAt: Date;
}
interface IUser {
  _id: Types.ObjectId;
  email: string;
  role: string;
  skills: string[];
}


import { inngest } from "../client";
import { NonRetriableError } from 'inngest';
import { ADMIN, HIGH, IN_PROGRESS, LOW, MEDIUM, MODERATOR } from '../../utils/constant';
import { analyzeTicket } from '../../ai-workflow/ai-agent';
import { AiTicketResponse } from '../../dto/ticket';
import { User } from '../../models/User';
import { sendMail } from '../../utils/sendMail';

export const onTicketCreation = inngest.createFunction(
  { id: "on-ticket-creation", retries: 2 },
  { event: "ticket/created" },
  async ({ event, step }) => {
    try {
      const { ticketId } = event.data;

      //Step 1 - Gather ticket information
      const ticketDetails = await step.run("gather ticket information", async () => {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
          throw new NonRetriableError("Ticket not found")
        }
        return ticket;
      }) as ITicket;

      //Step 2 - Update ticket progress
      await step.run("update ticket progress", async () => {
        const updatedTicket = await Ticket.findByIdAndUpdate
          (ticketId, { status: IN_PROGRESS }, { new: true });
        return updatedTicket;
      });

      //Step 3 - Analyze ticket
      const aiResponse: AiTicketResponse = await analyzeTicket({
        title: ticketDetails.title,
        description: ticketDetails.description
      });

      //Step 4 - AI generate the ticket information
      const skills: string[] = await step.run("ai-processing", async () => {
        let skills: string[] = []
        if (aiResponse) {
          const updatedTicket = await Ticket.findByIdAndUpdate
            (ticketId, {
              helpfulNotes: aiResponse.helpfulNotes,
              relatedSkills: aiResponse.relatedSkills,
              priority: [LOW, MEDIUM, HIGH]?.includes(aiResponse.priority) ? aiResponse.priority : MEDIUM,
              status: IN_PROGRESS
            }, { new: true });
          skills = aiResponse?.relatedSkills;
        }
        return skills;
      })


      //Step 5 - Assign ticket to moderator or admin
      const moderator = await step.run("assign-moderator", async () => {
        let user = await User?.findOne({
          role: MODERATOR,
          skills: {
            $elemMatch: {
              $regex: skills.join('|'),
              $options: 'i'
            }
          }
        })

        if (!user) {
          user = await User?.findOne({
            role: ADMIN,
          })
        }

        await Ticket.findByIdAndUpdate(ticketId, { assigned_to: user?._id || null }, { new: true });
        return user
      }) as IUser;


      //Step 6 - Send email to moderator with ticket details
      await step.run("send-ticket-assign-email", async () => {
        if (moderator) {
          const ticket = await Ticket.findById(ticketId);
          await sendMail(moderator?.email, `Hi, ${moderator?.email} you have been assigned a ticket`,
            `Ticket Title: ${ticket?.title}\nTicket Description: ${ticket?.description}\nTicket Priority: ${ticket?.priority}\nTicket Status: ${ticket?.status}\nTicket Assigned To: ${moderator?.email}`
          );
        }
      })

      
      return { success: true }
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }
  }

)