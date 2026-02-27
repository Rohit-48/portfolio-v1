"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { SpotifyResponse } from "@/types/spotify";
import NowPlaying from "./NowPlaying";
import LastPlayed from "./LastPlayed";
import type { SpotifyTrack } from "@/types/spotify";

const demoTrack: SpotifyTrack = {
  title: "Not playing right now",
  artist: "Spotify",
  album: "Connect to see live activity",
  albumArt: "",
  songUrl: "https://open.spotify.com",
  isPlaying: false,
};

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

export default function SpotifyPlayer() {
  const [data, setData] = useState<SpotifyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error("Failed to fetch");
        const json: SpotifyResponse = await res.json();
        setData(json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, []);

  const isLive = data?.isPlaying && data.track;
  const hasLastPlayed = data?.lastPlayed;

  return (
    <section className="py-14" ref={ref}>
      <div className="px-8 md:px-16 xl:px-[340px]">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="block font-mono text-[11px] text-accent tracking-label font-medium uppercase mb-6"
        >
          CURRENTLY
        </motion.span>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {loading ? (
            <Skeleton />
          ) : isLive && data.track ? (
            <div className="border border-border bg-surface p-5">
              <NowPlaying track={data.track} />
            </div>
          ) : hasLastPlayed && data.lastPlayed ? (
            <div className="border border-border bg-surface p-5">
              <LastPlayed track={data.lastPlayed} />
            </div>
          ) : (
            <div className="border border-border bg-surface p-5">
              <LastPlayed track={demoTrack} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <div className="border border-border bg-surface p-5">
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-1.5 h-1.5 bg-surface2 spotify-skeleton"
          style={{ clipPath: "circle(50%)" }}
        />
        <div className="h-2.5 w-20 bg-surface2 spotify-skeleton" />
      </div>
      <div className="flex gap-4 items-start">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-surface2 shrink-0 spotify-skeleton" />
        <div className="flex-1 min-w-0 space-y-2.5">
          <div className="h-3.5 w-3/4 bg-surface2 spotify-skeleton" />
          <div className="h-3 w-1/2 bg-surface2 spotify-skeleton" />
        </div>
      </div>
    </div>
  );
}
