import { useEffect, useMemo, useState } from "react";
import { Song } from "@/types";
import { songsData } from "@/app/utils/songsData";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const foundSong = songsData.find((song) => song.id.toString() === id);

      if (!foundSong) {
        setIsLoading(false);
        return;
      }

      setSong(foundSong);
      setIsLoading(false);
    };

    fetchSong();
  }, [id]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useSongById;
