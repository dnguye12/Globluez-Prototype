import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc, prefetch } from "@/trpc/server";
import VideoSections from "./components/VideosSection";

export const dynamic = "force-dynamic";

const StudioPage = async () => {
    prefetch(trpc.studio.getMany.infiniteQueryOptions({ limit: DEFAULT_LIMIT }));

    return (
        <HydrateClient>
            <div className="flex flex-col gap-y-6 pt-2.5">
                <div className="px-4">
                    <h1 className="text-2xl font-bold">Channel Content</h1>
                    <p className="text-xs text-muted-foreground">Manage your channel content and videos</p>
                </div>
                <VideoSections />
            </div>
        </HydrateClient>
    );
}

export default StudioPage;