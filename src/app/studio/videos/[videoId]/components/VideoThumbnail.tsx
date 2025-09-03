import { formatDuration } from "@/lib/utils";
import Image from "next/image";

interface VideoThumbnailProps {
    imageUrl?: string | null;
    previewUrl?: string | null;
    title: string;
    duration: number;
}

const VideoThumbnail = ({ imageUrl, previewUrl, title, duration }: VideoThumbnailProps) => {
    return (
        <div className="relative group">
            <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                <Image
                    src={imageUrl || "/placeholder.png"}
                    alt={title}
                    fill
                    className="object-cover size-full group-hover:opacity-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Image
                    src={previewUrl || "/placeholder.png"}
                    alt={title}
                    unoptimized={!!previewUrl}
                    fill
                    className="object-cover size-full opacity-0 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded  bg-black/80 text-white text-xs font-medium">
                {formatDuration(duration)}
            </div>
        </div>
    );
}

export default VideoThumbnail;