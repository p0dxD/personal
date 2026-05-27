import { NextResponse } from "next/server";
import { Resend } from "resend";

const ALLOWED_ORIGINS = new Set([
  "https://jobsentry.net",
  "https://wellbeingportal.app",
  "https://wellness.jobsentry.net",
  "https://stockfinancia.com",
]);

function corsHeaders(origin: string | null): Record<string, string> {
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
  }
  return {};
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400, headers: cors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json(
      { error: "Contact form is not configured yet. Please reach out directly." },
      { status: 503, headers: cors }
    );
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Portfolio Contact <contact@joserod.space>",
    to: "jose0797@gmail.com",
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(/\n/g, "<br>")}</p>`,
  });

  return NextResponse.json({ ok: true }, { headers: cors });
}
