import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    console.log("--- New Contact Request ---");
    const { firstName, lastName, email, message } = req.body;
    
    // Check for multiple possible names for the API key
    const resendApiKey = process.env.RESEND_API_KEY || process.env.Resend || process.env.RESEND;
    
    console.log("Available Environment Variables:", Object.keys(process.env));
    console.log("Resend API Key found:", !!resendApiKey);

    if (!resendApiKey) {
      return res.status(500).json({ 
        success: false, 
        message: "Email service not configured. Please rename your secret to RESEND_API_KEY in Settings." 
      });
    }

    try {
      console.log("Attempting to send email via Resend...");
      const resend = new Resend(resendApiKey);
      
      // Note: Using onboarding@resend.dev requires the 'to' address to be the verified account email.
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
        console.error("Resend API Error:", error);
        return res.status(400).json({ 
          success: false, 
          message: `Resend Error: ${error.message} (${error.name})` 
        });
      }

      console.log("Email sent successfully via Resend:", data);
      return res.json({ success: true, message: "Message sent successfully!" });

    } catch (err: any) {
      console.error("Resend SDK Exception:", err.message);
      return res.status(500).json({ 
        success: false, 
        message: `Server Exception: ${err.message || "Internal server error"}` 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
