import { pgTable, text, serial, integer, boolean, timestamp, date, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  // Personal Info
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dob: text("dob").notNull(), // Using text for date to simplify parsing from frontend datepicker
  niNumber: text("ni_number").notNull(),
  email: text("email").notNull(),
  contactNumber: text("contact_number").notNull(),
  address: text("address").notNull(),
  houseNumber: text("house_number").notNull(),
  postcode: text("postcode").notNull(),
  
  // Employment Details
  agencyRegistration: text("agency_registration").notNull(),
  startDate: text("start_date").notNull(),
  jobTitle: text("job_title").notNull(),
  agencyCompany: text("agency_company").notNull(),
  payRate: text("pay_rate").notNull(), // Storing as text to handle range/currency
  residence: text("residence").notNull(),
  
  // Documents (filenames)
  documents: text("documents").array(),
  
  // Payment Details
  bankName: text("bank_name").notNull(),
  accountName: text("account_name").notNull(),
  accountNumber: text("account_number").notNull(),
  sortCode: text("sort_code").notNull(),
  employeeType: text("employee_type").notNull(),
  
  // Consent
  consentTransactional: boolean("consent_transactional").default(false).notNull(),
  consentMarketing: boolean("consent_marketing").default(false).notNull(),
  
  // Additional Info
  description: text("description"),
  timeScale: text("time_scale"),
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  // Add specific validation if needed
  email: z.string().email(),
  consentTransactional: z.boolean().refine(val => val === true, "You must consent to transactional messages"),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
