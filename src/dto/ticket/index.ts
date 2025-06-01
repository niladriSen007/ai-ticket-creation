import { Request } from "express"
import { AuthRequest } from "../user"

export interface AiTicketResponse {
  summary: string,
  priority: string,
  helpfulNotes: string,
  relatedSkills: string[]
}

export interface TicketCreationRequestBody {
  title: string,
  description: string

}
export interface TicketCreationRequest extends AuthRequest {
  body: TicketCreationRequestBody
}