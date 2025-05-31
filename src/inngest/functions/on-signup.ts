import { NonRetriableError } from "inngest";
import { User } from "../../models/User";
import { inngest } from "../client"
import { sendMail } from "../../utils/sendMail";

export const onUserSignUp = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;

      //Step 1
      await step.run("send-welcome-email", async () => {
        const user = User.findOne({ email })
        if (!user) {
          throw new NonRetriableError("User not found")
        }
        return user;
      });

      //Step 2
      await step.run("send-welcome-email", async () => {
        await sendMail(email, "Welcome to our app", "Thanks for signing up!");
      })

      return { success: true }
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }
  }
);