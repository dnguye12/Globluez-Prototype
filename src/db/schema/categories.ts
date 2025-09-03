import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { videos } from "./videos";

export const categories = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryName: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [uniqueIndex("category_name_idx").on(t.categoryName)])

export const categoryRelations = relations(categories, ({many}) => ({
    videos: many(videos)
}))