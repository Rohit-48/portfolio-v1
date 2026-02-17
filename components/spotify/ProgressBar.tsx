"use client";

import { useState, useEffect } from "react";

interface ProgressBarProps {
  progressMs: number;
  durationMs: number;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function ProgressBar({ progressMs, durationMs }: ProgressBarProps) {
  const [progress, setProgress] = useState(progressMs);

  useEffect(() => {
    setProgress(progressMs);
  }, [progressMs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= durationMs) return prev;
        return prev + 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [durationMs]);

  const percentage = durationMs > 0 ? Math.min((progress / durationMs) * 100, 100) : 0;

  return (
    <div>
      {/* Bar */}
      <div className="w-full h-[2px] bg-border mt-3">
        <div
          className="h-full bg-accent"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Timestamps */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="font-mono text-[10px] text-dim tracking-tag">
          {formatTime(progress)}
        </span>
        <span className="font-mono text-[10px] text-dim tracking-tag">
          {formatTime(durationMs)}
        </span>
      </div>
    </div>
  );
}
