import "./globals.css";
import { Figtree } from "next/font/google";

import Sidebar from "../components/Sidebar";
import Player from "@/components/Player";
import getSongs from "@/actions/getSongs";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Sangeet",
  description: "Listen to music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongs();

  return (
    <html lang="en">
      <body className={figtree.className}>
        <Sidebar songs={userSongs}>{children}</Sidebar>
        <Player />
      </body>
    </html>
  );
}
