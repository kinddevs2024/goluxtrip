import nodemailer from "nodemailer";
import { z } from "zod";

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

export default async function handler(req, res) {
  // CORS setup
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const parsed = applicationSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: "Please check the application fields." });
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

    res.status(200).json({ message: "Application sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email could not be sent right now." });
  }
}
