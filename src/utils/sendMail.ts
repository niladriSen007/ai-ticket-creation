import nodemailer from "nodemailer"
import { MAILTRAP_SMTP_HOST, MAILTRAP_SMTP_PORT, MAILTRAP_SMTP_USER, MAILTRAP_SMTP_PASS } from "../config"

export const sendMail = async (to: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAILTRAP_SMTP_HOST,
      port: parseInt(MAILTRAP_SMTP_PORT ?? "587"),
      secure: false,
      auth: {
        user: MAILTRAP_SMTP_USER,
        pass: MAILTRAP_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from : MAILTRAP_SMTP_USER,
      to,
      subject,
      text
    })

    console.log(`Message Sent - ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error(`Error sending email: ${error}`);
    
  }
}