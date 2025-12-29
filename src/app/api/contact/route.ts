import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData;
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "shardendumishrafedora@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #ffffff; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #000000;">
        
        <!-- Header -->
        <div style="background: #000000; padding: 40px 30px; text-align: center; border-bottom: 1px solid #000000;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">NEW CONTACT MESSAGE</h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
            
            <!-- Sender Info -->
            <div style="border: 1px solid #000000; padding: 24px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 20px; color: #000000; font-size: 16px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
                    Sender Information
                </h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #000000; font-weight: 600; font-size: 13px; width: 100px;">NAME</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #000000; font-size: 14px;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #000000; font-weight: 600; font-size: 13px;">EMAIL</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                            <a href="mailto:${email}" style="color: #000000; text-decoration: underline; font-size: 14px;">${email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #000000; font-weight: 600; font-size: 13px;">SUBJECT</td>
                        <td style="padding: 12px 0; color: #000000; font-size: 14px;">${subject}</td>
                    </tr>
                </table>
            </div>

            <!-- Message -->
            <div style="border: 1px solid #000000; padding: 24px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px; color: #000000; font-size: 16px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
                    Message
                </h2>
                <div style="background: #ffffff; padding: 0; color: #000000; font-size: 14px; line-height: 1.7; white-space: pre-wrap; word-wrap: break-word;">${message}</div>
            </div>

            <!-- Action Button -->
            <div style="text-align: center; margin: 32px 0;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: #000000; color: #ffffff; text-decoration: none; padding: 14px 36px; font-weight: 600; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; border: 2px solid #000000; transition: all 0.3s ease;">
                    Reply to ${name}
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #000000; padding: 24px 30px; text-align: center; border-top: 1px solid #000000;">
            <p style="margin: 0 0 8px; color: #ffffff; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">
                PORTFOLIO CONTACT SYSTEM
            </p>
            <p style="margin: 0; color: #a0a0a0; font-size: 11px;">
                mishrashardendu22.is-a.dev
            </p>
        </div>
    </div>
</body>
</html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
