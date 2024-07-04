"use client";

import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    setIsLiked((e) => !e);
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
