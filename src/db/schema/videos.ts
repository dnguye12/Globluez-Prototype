import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { categories } from "./categories";
import { countries } from "./countries";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

export const videoVisibility = pgEnum("video_visibility", ["public", "private"]);

export const videos = pgTable("videos", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),

    muxStatus: text("mux_status"),
    muxAssetId: text("mux_status_id").unique(),
    muxUploadId: text("mux_upload_id").unique(),
    muxPlaybackId: text("mux_playback_id").unique(),
    muxTrackId: text("mux_track_id").unique(),
    muxTrackStatus: text("mux_track_status"),

    thumbnailUrl: text("thumbnail_url"),
    previewUrl: text("preview_url"),
    duration: integer("duration"),
    visibility: videoVisibility("visibility").notNull().default("public"),

    categoryId: uuid("category_id").references(() => categories.id, {
        onDelete: "set null"
    }),
    countryId: uuid("country_id").references(() => countries.id, {
        onDelete: "set null"
    }),
    userId: text("user_id").references(() => users.id, {
        onDelete: "cascade"
    }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const videoInsertSchema = createInsertSchema(videos);
export const videoUpdateSchema = createUpdateSchema(videos);
export const videoSelectSchema = createSelectSchema(videos);

export const videoRelations = relations(videos, ({ one }) => ({
    user: one(users, {
        fields: [videos.userId],
        references: [users.id]
    }),
    category: one(categories, {
        fields: [videos.categoryId],
        references: [categories.id]
    }),
    country: one(countries, {
        fields: [videos.countryId],
        references: [countries.id]
    })
}))