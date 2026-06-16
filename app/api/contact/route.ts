import { NextResponse } from "next/server";

/**
 * Contact form handler.
 *
 * This reference implementation validates input, blocks honeypot spam, and
 * logs the submission server-side. To actually deliver messages, wire in an
 * email provider (Resend, Postmark, SendGrid, Nodemailer) where indicated.
 */

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string; // honeypot
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "website" field.
  if (body.website) {
    return NextResponse.json({ ok: true }); // silently accept + drop
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Please add a little more detail about your project." },
      { status: 400 }
    );
  }

  // --- Deliver the message -------------------------------------------------
  // TODO: integrate an email provider here. Example with Resend:
  //
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Portfolio <noreply@yourdomain.com>",
  //     to: process.env.NEXT_PUBLIC_EMAIL!,
  //     replyTo: email,
  //     subject: `New enquiry from ${name}`,
  //     text: `${name} (${email})\nCompany: ${body.company ?? "—"}\n\n${message}`,
  //   });
  //
  // Until then, log it so submissions are visible in server logs.
  console.log("[contact] new enquiry", {
    name,
    email,
    company: body.company ?? "",
    message,
  });

  return NextResponse.json({ ok: true });
}
