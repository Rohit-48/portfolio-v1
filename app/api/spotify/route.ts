import { NextResponse } from "next/server";
import { getAccessToken, getNowPlaying, getRecentlyPlayed } from "@/lib/spotify";
import type { SpotifyResponse, SpotifyTrack } from "@/types/spotify";

function parseTrack(item: Record<string, unknown>, isPlaying: boolean): SpotifyTrack {
  const track = item as Record<string, unknown>;
  const artists = (track.artists as Array<{ name: string }>) ?? [];
  const album = track.album as Record<string, unknown>;
  const images = (album?.images as Array<{ url: string }>) ?? [];
  const externalUrls = (track.external_urls as Record<string, string>) ?? {};

  return {
    title: (track.name as string) ?? "Unknown",
    artist: artists.map((a) => a.name).join(", ") || "Unknown",
    album: (album?.name as string) ?? "Unknown",
    albumArt: images[0]?.url ?? "",
    songUrl: externalUrls.spotify ?? "",
    isPlaying,
  };
}

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { isPlaying: false, track: null, lastPlayed: null } satisfies SpotifyResponse,
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const nowPlayingRes = await getNowPlaying(accessToken);

    if (nowPlayingRes.status === 200) {
      const data = await nowPlayingRes.json();

      if (data.is_playing && data.item) {
        const track = parseTrack(data.item, true);
        track.durationMs = data.item.duration_ms;
        track.progressMs = data.progress_ms;

        return NextResponse.json(
          { isPlaying: true, track, lastPlayed: null } satisfies SpotifyResponse,
          { headers: { "Cache-Control": "no-store" } }
        );
      }
    }

    // Not playing — get recently played
    const recentRes = await getRecentlyPlayed(accessToken);

    if (recentRes.status === 200) {
      const data = await recentRes.json();
      const items = data.items as Array<{ track: Record<string, unknown> }>;

      if (items?.length > 0) {
        const lastPlayed = parseTrack(items[0].track, false);

        return NextResponse.json(
          { isPlaying: false, track: null, lastPlayed } satisfies SpotifyResponse,
          { headers: { "Cache-Control": "no-store" } }
        );
      }
    }

    return NextResponse.json(
      { isPlaying: false, track: null, lastPlayed: null } satisfies SpotifyResponse,
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { isPlaying: false, track: null, lastPlayed: null } satisfies SpotifyResponse,
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
