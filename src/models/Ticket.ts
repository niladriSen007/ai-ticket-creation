import { model, Schema } from "mongoose";
import { CLOSED, CRITICAL, HIGH, IN_PROGRESS, LOW, MEDIUM, OPEN } from "../../utils/constant";

const TicketSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    trim: true,
    enum: [OPEN, CLOSED, IN_PROGRESS],
    default: OPEN,
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by XXX is required"]
    },
    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assigned to XXX is required"]
    },
    priority: {
      type: String,
      required: [true, "Priority is required"],
      enum: [LOW, MEDIUM, HIGH, CRITICAL],
      trim: true
    },
    deadline: Date,
    helpfulNotes: String,
    relatedSkills: [String]
  }
}, {
  timestamps: true
})

export const Ticket = model("Ticket", TicketSchema);