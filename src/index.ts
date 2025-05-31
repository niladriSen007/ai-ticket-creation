import cors from "cors";
import express from "express";
import Router from "./router"
import { PORT } from "./config";
import { connectDB } from "./database/inex";
export { MONGODB_URI, PORT } from "./config";

const app = express();

app.use(cors())
app.use(express.json());

await connectDB();

app.use("/api/v1/", Router);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});