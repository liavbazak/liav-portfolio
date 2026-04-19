import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { firstName, lastName, email, message } = req.body;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return res.status(500).json({ 
      success: false, 
      message: "Email service not configured. Please add RESEND_API_KEY to your Vercel Environment Variables." 
    });
  }

  try {
    const resend = new Resend(resendApiKey);
    
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["liav.bazak@gmail.com"],
      replyTo: email,
      subject: `New Contact from Portfolio: ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: `Resend Error: ${error.message}` 
      });
    }

    return res.status(200).json({ success: true, message: "Message sent successfully!" });

  } catch (err: any) {
    return res.status(500).json({ 
      success: false, 
      message: `Server Exception: ${err.message || "Internal server error"}` 
    });
  }
}
