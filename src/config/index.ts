import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";
const PORT = process.env.PORT || 3000;
const MAILTRAP_SMTP_HOST = process.env.MAILTRAP_SMTP_HOST || "";
const MAILTRAP_SMTP_PORT = process.env.MAILTRAP_SMTP_PORT || "";
const MAILTRAP_SMTP_USER = process.env.MAILTRAP_SMTP_USER || "";
const MAILTRAP_SMTP_PASS = process.env.MAILTRAP_SMTP_PASS || "";
const JWT_SECRET = process.env.JWT_SECRET || "jhbvgdjkfgjkfhskfskhjgfsfsdgg"
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""

export {
  MONGODB_URI,
  PORT,
  MAILTRAP_SMTP_HOST,
  MAILTRAP_SMTP_PORT,
  MAILTRAP_SMTP_USER,
  MAILTRAP_SMTP_PASS,
  JWT_SECRET,
  GEMINI_API_KEY
}