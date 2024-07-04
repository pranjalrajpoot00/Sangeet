import { Song } from "@/types";

const useLoadSongUrl = (song: Song) => {
  if (!song) {
    return "";
  }

  return song.url;
};

export default useLoadSongUrl;
