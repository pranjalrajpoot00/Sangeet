// utils/getSongs.ts
import { Song } from "@/types";
import { songsData } from "@/app/utils/songsData";

const getSongs = async (): Promise<Song[]> => {
  // Instead of fetching from Supabase, return the static data
  return songsData;
};

export default getSongs;
