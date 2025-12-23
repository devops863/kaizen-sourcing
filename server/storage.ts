import { applications, type InsertApplication, type Application } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createApplication(application: InsertApplication): Promise<Application>;
  getApplications(): Promise<Application[]>;
}

export class DatabaseStorage implements IStorage {
  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [application] = await db
      .insert(applications)
      .values(insertApplication)
      .returning();
    return application;
  }

  async getApplications(): Promise<Application[]> {
    return await db.select().from(applications);
  }
}

export const storage = new DatabaseStorage();
