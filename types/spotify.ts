export interface SpotifyTrack {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  songUrl: string;
  isPlaying: boolean;
  durationMs?: number;
  progressMs?: number;
}

export interface SpotifyResponse {
  isPlaying: boolean;
  track: SpotifyTrack | null;
  lastPlayed: SpotifyTrack | null;
}
