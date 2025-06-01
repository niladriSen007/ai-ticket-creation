import { onTicketCreation } from './inngest/functions/on-ticket-creation';
import { onUserSignUp } from './inngest/functions/on-signup';
import cors from "cors";
import express from "express";
import Router from "./router"
import { PORT } from "./config";
import { connectDB } from "./database/inex";
export { MONGODB_URI, PORT } from "./config";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client";

const app = express();

app.use(cors())
app.use(express.json());

await connectDB();

app.use("/api/v1/", Router);

app.use("/api/v1/inngest",serve({
  client: inngest,
  functions : [
    onUserSignUp,
    onTicketCreation
  ]
}))




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});