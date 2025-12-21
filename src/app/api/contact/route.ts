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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 40px 30px; text-align: center; position: relative;">
            <div style="background: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255, 255, 255, 0.3);">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            </div>
            <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">New Contact Message</h1>
            <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Someone reached out through your portfolio</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
            
            <!-- Sender Info Card -->
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #06b6d4; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 20px; color: #0c4a6e; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                    <span style="background: #06b6d4; color: white; width: 30px; height: 30px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; font-size: 16px;">👤</span>
                    Sender Information
                </h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(6, 182, 212, 0.2); color: #0c4a6e; font-weight: 600; font-size: 14px; width: 100px;">Name:</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(6, 182, 212, 0.2); color: #0e7490; font-size: 15px;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(6, 182, 212, 0.2); color: #0c4a6e; font-weight: 600; font-size: 14px;">Email:</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(6, 182, 212, 0.2);">
                            <a href="mailto:${email}" style="color: #0284c7; text-decoration: none; font-size: 15px;">${email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #0c4a6e; font-weight: 600; font-size: 14px;">Subject:</td>
                        <td style="padding: 12px 0; color: #0e7490; font-size: 15px;">${subject}</td>
                    </tr>
                </table>
            </div>

            <!-- Message Card -->
            <div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-left: 4px solid #eab308; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px; color: #713f12; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                    <span style="background: #eab308; color: white; width: 30px; height: 30px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; font-size: 16px;">💬</span>
                    Message
                </h2>
                <div style="background: white; border-radius: 8px; padding: 20px; color: #3f3f46; font-size: 15px; line-height: 1.8; white-space: pre-wrap; word-wrap: break-word; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">${message}</div>
            </div>

            <!-- Action Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4); transition: all 0.3s ease;">
                    📧 Reply to ${name}
                </a>
            </div>

            <!-- Divider -->
            <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%); margin: 30px 0;"></div>

            <!-- Quick Actions -->
            <div style="background: #f9fafb; border-radius: 12px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 15px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Quick Actions</p>
                <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                    <a href="mailto:${email}" style="display: inline-block; background: white; color: #3b82f6; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; border: 2px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                        ✉️ Send Email
                    </a>
                    <a href="https://mishrashardendu22.is-a.dev" style="display: inline-block; background: white; color: #3b82f6; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; border: 2px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                        🌐 View Portfolio
                    </a>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 30px; text-align: center; border-top: 3px solid #06b6d4;">
            <p style="margin: 0 0 10px; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 600;">
                📬 Portfolio Contact System
            </p>
            <p style="margin: 0 0 15px; color: rgba(255, 255, 255, 0.6); font-size: 12px;">
                This message was sent from your portfolio website at mishrashardendu22.is-a.dev
            </p>
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 15px; margin-top: 15px;">
                <p style="margin: 0; color: rgba(255, 255, 255, 0.5); font-size: 11px;">
                    © 2025 Shardendu Mishra. Built with ❤️ using Next.js & Resend
                </p>
            </div>
        </div>
    </div>

    <!-- Background decorative elements for email clients that support it -->
    <div style="text-align: center; margin-top: 20px; color: rgba(255, 255, 255, 0.6); font-size: 12px;">
        <p style="margin: 0;">✨ Powered by modern email technology ✨</p>
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
