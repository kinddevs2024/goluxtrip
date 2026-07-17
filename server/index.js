import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5174);

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json({ limit: "10mb" }));

const applicationSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(5).max(40),
  car: z.string().min(2).max(80),
  dates: z.string().min(2).max(120),
  route: z.string().min(2).max(500),
  message: z.string().max(1000).optional().default("")
});

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "EMAIL_FROM", "EMAIL_TO"];

function getTransporter() {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing email environment variables: ${missing.join(", ")}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/apply", async (request, response) => {
  const parsed = applicationSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ message: "Please check the application fields." });
    return;
  }

  const data = parsed.data;
  const subject = `New GoLuxTrip request - ${data.car}`;
  const text = [
    "New GoLuxTrip application",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Selected car: ${data.car}`,
    `Dates: ${data.dates}`,
    `Route / plan: ${data.route}`,
    "",
    "Message:",
    data.message || "-"
  ].join("\n");

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"GoLuxTrip Landing" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: data.email,
      subject,
      text
    });

    response.json({ message: "Application sent." });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Email could not be sent right now." });
  }
});

app.listen(port, () => {
  console.log(`GoLuxTrip API listening on http://localhost:${port}`);
});
