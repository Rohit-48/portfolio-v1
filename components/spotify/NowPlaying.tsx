import Image from "next/image";
import type { SpotifyTrack } from "@/types/spotify";
import ProgressBar from "./ProgressBar";

interface NowPlayingProps {
  track: SpotifyTrack;
}

export default function NowPlaying({ track }: NowPlayingProps) {
  return (
    <div>
      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-5">
        <span className="spotify-pulse-dot" />
        <span className="font-mono text-[10px] text-[#1DB954] tracking-label font-medium">
          PLAYING NOW
        </span>
      </div>

      {/* Content row */}
      <div className="flex gap-4 items-start">
        {/* Album art */}
        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 border border-border overflow-hidden relative">
          {track.albumArt ? (
            <Image
              src={track.albumArt}
              alt={track.album}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-surface2 flex items-center justify-center">
              <span className="font-mono text-[20px] text-dim">♪</span>
            </div>
          )}
        </div>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-mono text-sm font-semibold text-primary tracking-tighter truncate min-w-0">
              {track.title}
            </h4>
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-dim hover:text-accent transition-colors duration-150 shrink-0 self-start"
              aria-label="Open in Spotify"
            >
              &nearr;
            </a>
          </div>

          {/* Artist + album */}
          <p className="flex items-center gap-1 mb-3 min-w-0">
            <span className="font-sans text-[13px] text-secondary truncate">
              {track.artist}
            </span>
            <span className="font-sans text-[13px] text-dim shrink-0"> — </span>
            <span className="font-sans text-[13px] text-dim truncate">
              {track.album}
            </span>
          </p>

          {/* Progress */}
          {track.durationMs && track.progressMs !== undefined && (
            <ProgressBar
              progressMs={track.progressMs}
              durationMs={track.durationMs}
            />
          )}
        </div>
      </div>
    </div>
  );
}
