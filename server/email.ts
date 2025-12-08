import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log("Email credentials not configured. Email would be sent to:", options.to);
      console.log("Subject:", options.subject);
      return true;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    });

    console.log("Email sent successfully to:", options.to);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

export function formatContactEmail(data: { name: string; phone: string; email: string; message: string }): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">New Contact Inquiry</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px; font-weight: bold;">Name:</td><td style="padding: 10px;">${data.name}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Phone:</td><td style="padding: 10px;">${data.phone}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Email:</td><td style="padding: 10px;">${data.email}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
        <h3 style="margin-top: 0;">Message:</h3>
        <p>${data.message}</p>
      </div>
    </div>
  `;
}

export function formatBookingEmail(data: { name: string; phone: string; email: string; service: string; date: string; message?: string }): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">New Booking Request</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px; font-weight: bold;">Name:</td><td style="padding: 10px;">${data.name}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Phone:</td><td style="padding: 10px;">${data.phone}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Email:</td><td style="padding: 10px;">${data.email}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Service:</td><td style="padding: 10px; color: #dc2626; font-weight: bold;">${data.service}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Preferred Date:</td><td style="padding: 10px;">${data.date}</td></tr>
      </table>
      ${data.message ? `
      <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
        <h3 style="margin-top: 0;">Additional Notes:</h3>
        <p>${data.message}</p>
      </div>
      ` : ''}
    </div>
  `;
}

export function formatWarrantyEmail(data: {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  service: string;
  registrationNo: string;
  vehicleBrand: string;
  vehicleModel: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">New Warranty Registration</h2>
      
      <h3 style="color: #374151; margin-top: 20px;">Customer Details</h3>
      <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px;">
        <tr><td style="padding: 10px; font-weight: bold;">Name:</td><td style="padding: 10px;">${data.name}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Phone:</td><td style="padding: 10px;">${data.phone}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Email:</td><td style="padding: 10px;">${data.email}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Location:</td><td style="padding: 10px;">${data.city}, ${data.state}</td></tr>
      </table>
      
      <h3 style="color: #374151; margin-top: 20px;">Vehicle Information</h3>
      <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px;">
        <tr><td style="padding: 10px; font-weight: bold;">Service Availed:</td><td style="padding: 10px; color: #dc2626; font-weight: bold;">${data.service}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Registration No:</td><td style="padding: 10px;">${data.registrationNo}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Vehicle:</td><td style="padding: 10px;">${data.vehicleBrand} ${data.vehicleModel}</td></tr>
      </table>
      
      <p style="margin-top: 20px; padding: 15px; background: #fef2f2; border-radius: 8px; color: #991b1b;">
        <strong>Note:</strong> Invoice document is attached to this email.
      </p>
    </div>
  `;
}
