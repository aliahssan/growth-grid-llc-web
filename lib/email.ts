import sgMail from "@sendgrid/mail";
import { z } from "zod";

let isConfigured = false;

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(80),
  email: z.string().email("Enter a valid email"),
  company: z.string().max(120).optional().or(z.literal("").transform(() => undefined)),
  message: z
    .string()
    .min(20, "Share a bit more detail (20+ characters)")
    .max(1500),
});

export type ContactPayload = z.infer<typeof contactSchema>;

function ensureSendGrid() {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY is not set");
  }
  if (!isConfigured) {
    sgMail.setApiKey(apiKey);
    isConfigured = true;
  }
}

export async function sendContactEmail(payload: ContactPayload) {
  const data = contactSchema.parse(payload);

  ensureSendGrid();

  const fromEmail =
    process.env.SENDGRID_FROM_EMAIL ?? process.env.SENDGRID_TO_EMAIL;
  const toEmail =
    process.env.SENDGRID_TO_EMAIL ?? process.env.SENDGRID_FROM_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new Error("SendGrid from/to email env vars are missing");
  }

  await sgMail.send({
    to: toEmail,
    from: fromEmail,
    replyTo: data.email,
    subject: `New Growth Grid inquiry from ${data.name}`,
    text: `${data.message}\n\nCompany: ${data.company ?? "N/A"}\nEmail: ${
      data.email
    }`,
    html: `
      <div style="font-family: Inter, sans-serif; line-height: 1.6;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company ?? "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });
}

