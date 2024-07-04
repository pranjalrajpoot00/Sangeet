// utils/getSongsByTitle.ts
import { Song } from "@/types";
import { songsData } from "@/app/utils/songsData";
import getSongs from "./getSongs";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const filteredSongs = songsData.filter((song) =>
    song.name.toLowerCase().includes(title.toLowerCase())
  );

  return filteredSongs;
};

export default getSongsByTitle;
