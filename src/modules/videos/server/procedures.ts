import { db } from "@/db";
import { videos } from "@/db/schema/videos";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

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
    })
})