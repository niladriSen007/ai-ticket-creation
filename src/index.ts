import cors from "cors";
import express from "express";
import chalk from "chalk";
import { PORT } from "./config";
import { connectDB } from "./database/inex";
export { MONGODB_URI, PORT } from "./config";

const app = express();

app.use(cors())
app.use(express.json());

await connectDB();


app.listen(PORT, () => {
  chalk.green(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});