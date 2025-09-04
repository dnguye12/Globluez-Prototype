import { HydrateClient } from "@/trpc/server";
import FormSection from "./components/FormSection";

interface VideoPageProps {
    params: Promise<{ videoId: string }>
}

const VideoPage = async ({ params }: VideoPageProps) => {
    const { videoId } = await params

    return (
        <HydrateClient>
            <div className="px-4 pt-2.5 max-w-screen-lg">
                <FormSection videoId={videoId} />
            </div>
        </HydrateClient>
    );
}

export default VideoPage;