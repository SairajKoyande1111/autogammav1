import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { contactFormSchema, bookingFormSchema, warrantyFormSchema } from "@shared/schema";
import { sendEmail, formatContactEmail, formatBookingEmail, formatWarrantyEmail } from "./email";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG and PDF files are allowed'));
    }
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER || "info@autogamma.in";

  app.post("/api/contact", async (req, res) => {
    try {
      const result = contactFormSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid form data", details: result.error.flatten() });
      }

      const emailSent = await sendEmail({
        to: recipientEmail,
        subject: `New Contact Inquiry from ${result.data.name}`,
        html: formatContactEmail(result.data),
      });

      if (emailSent) {
        res.json({ success: true, message: "Your message has been sent successfully!" });
      } else {
        res.status(500).json({ error: "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "An error occurred. Please try again." });
    }
  });

  app.post("/api/booking", async (req, res) => {
    try {
      const result = bookingFormSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid form data", details: result.error.flatten() });
      }

      const emailSent = await sendEmail({
        to: recipientEmail,
        subject: `New Booking Request - ${result.data.service} from ${result.data.name}`,
        html: formatBookingEmail(result.data),
      });

      if (emailSent) {
        res.json({ success: true, message: "Your booking request has been submitted!" });
      } else {
        res.status(500).json({ error: "Failed to submit booking. Please try again." });
      }
    } catch (error) {
      console.error("Booking form error:", error);
      res.status(500).json({ error: "An error occurred. Please try again." });
    }
  });

  app.post("/api/warranty", upload.single("invoice"), async (req, res) => {
    try {
      const result = warrantyFormSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid form data", details: result.error.flatten() });
      }

      const file = req.file;
      const attachments = file ? [{
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype,
      }] : undefined;

      const emailSent = await sendEmail({
        to: recipientEmail,
        subject: `Warranty Registration - ${result.data.vehicleBrand} ${result.data.vehicleModel} (${result.data.registrationNo})`,
        html: formatWarrantyEmail(result.data),
        attachments,
      });

      if (emailSent) {
        res.json({ success: true, message: "Warranty registered successfully!" });
      } else {
        res.status(500).json({ error: "Failed to register warranty. Please try again." });
      }
    } catch (error) {
      console.error("Warranty form error:", error);
      res.status(500).json({ error: "An error occurred. Please try again." });
    }
  });

  return httpServer;
}
