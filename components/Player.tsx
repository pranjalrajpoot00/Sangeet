"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";

import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  let gradient = song?.gradient_accent;
  console.log(gradient);

  return (
    <div
      className={`fixed bottom-0 bg-gradient-to-b ${gradient} w-full py-2 h-[80px] px-4`}
    >
      <PlayerContent key={songUrl} song={song} url={songUrl} />
    </div>
  );
};

export default Player;
