import { db } from "@/db";
import { videos, videoUpdateSchema } from "@/db/schema/videos";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import z from "zod";

export const videosRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({ ctx }) => {
        const { userId } = ctx.auth

        const upload = await mux.video.uploads.create({
            new_asset_settings: {
                passthrough: userId,
                playback_policies: ["public"],
                static_renditions: [
                    {
                        "resolution": "highest"
                    }
                ]
            },
            cors_origin: "*"
        })

        const [video] = await db.insert(videos).values({
            userId,
            title: "Untitled",
            muxStatus: "waiting",
            muxUploadId: upload.id
        })
            .returning()

        return {
            video: video,
            url: upload.url
        }
    }),
    update: protectedProcedure.input(videoUpdateSchema).mutation(async ({ ctx, input }) => {
        const { userId } = ctx.auth

        if (!userId || !input.id) {
            throw new TRPCError({ code: "BAD_REQUEST" });
        }

        const [updatedVideo] = await db.update(videos)
            .set({
                title: input.title,
                description: input.description,
                categoryId: input.categoryId,
                visibility: input.visibility,
                updatedAt: new Date(),
            })
            .where(and(eq(videos.id, input.id), eq(videos.userId, userId)))
            .returning()

        if (!updatedVideo) {
            throw new TRPCError({ code: "NOT_FOUND" })
        }

        return updatedVideo
    }),
    remove: protectedProcedure.input(z.object({ id: z.uuid() })).mutation(async ({ ctx, input }) => {
        const { userId } = ctx.auth

        if (!userId || !input.id) {
            throw new TRPCError({ code: "BAD_REQUEST" });
        }

        const [removeVideo] = await db.delete(videos)
            .where(and(eq(videos.id, input.id), eq(videos.userId, userId)))
            .returning();

        if (!removeVideo) {
            throw new TRPCError({ code: "NOT_FOUND" });
        }

        return removeVideo;
    })
})