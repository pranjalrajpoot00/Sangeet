import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[];
}

const Library = ({ songs }: LibraryProps) => {
  const onPlay = useOnPlay(songs);

  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Top Tracks</p>
        </div>
        <AiOutlinePlus
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          size={20}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs
          .filter((song) => song.top_track)
          .map((song) => (
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              key={song.id}
              data={song}
            />
          ))}
      </div>
    </div>
  );
};

export default Library;
