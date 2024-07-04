import * as RadixSlider from "@radix-ui/react-slider";
import { useEffect, useRef, useState } from "react";

interface MusicSliderProps {
  currentTime: number; // Current playback time in seconds
  duration: number; // Total duration of the music in seconds
  onSeek: (time: number) => void; // Callback for seeking
}

const MusicSlider: React.FC<MusicSliderProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  const [value, setValue] = useState(currentTime);
  const isFirstRender = useRef(true);

  // Update slider value when currentTime changes
  useEffect(() => {
    // Avoid updating value during the first render to prevent initial flickering
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setValue(currentTime);
  }, [currentTime]);

  const handleChange = (newValue: number[]) => {
    setValue(newValue[0]);
  };

  const handleSeek = () => {
    onSeek(value); // Trigger seek action on slider release
  };

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-6 cursor-pointer"
      value={[value]}
      onValueChange={handleChange}
      onPointerUp={handleSeek} // Seek when releasing the slider
      min={0}
      max={duration}
    >
      <RadixSlider.Track className="bg-neutral-800 relative grow rounded-full h-[5px]">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default MusicSlider;
