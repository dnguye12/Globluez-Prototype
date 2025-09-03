import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { videos } from "./videos";

export const users = pgTable("users", {
    id: text("clerk_id").unique(),
    username: text("username").notNull(),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (t) => [uniqueIndex("username_idx").on(t.username)])

export const userRelations = relations(users, ({ many }) => ({
    videos: many(videos)
}))