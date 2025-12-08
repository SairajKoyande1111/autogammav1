import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Booking Form Schema
export const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a preferred date"),
  message: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

// Warranty Registration Schema
export const warrantyFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  service: z.string().min(1, "Please select a service"),
  registrationNo: z.string().min(4, "Vehicle registration number is required"),
  vehicleBrand: z.string().min(2, "Vehicle brand is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
});

export type WarrantyFormData = z.infer<typeof warrantyFormSchema>;
