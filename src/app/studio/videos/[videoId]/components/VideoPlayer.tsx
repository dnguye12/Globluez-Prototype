import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
    playbackId?: string | null | undefined;
    thumbnailUrl?: string | null | undefined;
    autoPlay?: boolean;
    onPlay?: () => void;
}

const VideoPlayer = ({ playbackId, thumbnailUrl, autoPlay, onPlay }: VideoPlayerProps) => {
    return ( 
        <MuxPlayer
      playbackId={playbackId || ""}
      poster={thumbnailUrl || "/placeholder.png"}
      playerInitTime={0}
      autoPlay={autoPlay}
      className="w-full h-full object-contain"
      accentColor="#FF2056"
      onPlay={onPlay}
    />
     );
}

export default VideoPlayer;