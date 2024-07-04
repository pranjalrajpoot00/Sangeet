"use client";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import MusicSlider from "./MusicSlider";

interface PlayerContentProps {
  song: Song;
  url: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, url }) => {
  const player = usePlayer();

  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // State to track current playback time
  const [duration, setDuration] = useState(0); // State to track total duration

  const Icon = isPlaying ? FaCirclePause : FaCirclePlay;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(url, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (sound) {
        setCurrentTime(sound.seek());
      }
    };

    const updateDuration = () => {
      if (sound) {
        setDuration(sound.duration());
      }
    };

    const interval = setInterval(() => {
      updateCurrentTime();
      updateDuration();
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [sound]);

  const handleSeek = (newTime: number) => {
    if (sound) {
      sound.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div onClick={handlePlay} className="h-8 w-8 cursor-pointer">
          <Icon size={30} className="text-white bg-black rounded-full" />
        </div>
      </div>

      <div className="flex flex-col w-full justify-end items-center">
        <MusicSlider
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />
        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-8">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div onClick={handlePlay} className="h-8 w-8 cursor-pointer">
            <Icon size={30} className="text-white bg-black rounded-full" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[180px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
