import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { videos } from "./videos";

export const countries = pgTable("countries", {
    id: uuid("id").primaryKey().defaultRandom(),
    countryName: text("name").notNull().unique(),
    emoji: text("emoji"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [uniqueIndex("country_name_idx").on(t.countryName)])

export const countryRelations = relations(countries, ({ many }) => ({
    videos: many(videos)
}))