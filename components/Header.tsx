"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import Button from "./Button";
import Link from "next/link";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-700 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="rounded-full bg-black flex justify-center items-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="rounded-full bg-black flex justify-center items-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center jusitfy-center hover:opacity-75 transition">
            <Link href="/">
              <HiHome className="text-black" size={20} />
            </Link>
          </button>
          <button className="rounded-full p-2 bg-white flex items-center jusitfy-center hover:opacity-75 transition">
            <Link href="/search">
              <BiSearch className="text-black" size={20} />
            </Link>
          </button>
        </div>
        <div className="flex justufy-between items-center gap-x-4">
          <div className="flex gap-x-4 items-center">
            <Button className="py-2 px-5">Logout</Button>
            <Button className="bg-white" onClick={() => router.push("/")}>
              <FaUserAlt />
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
