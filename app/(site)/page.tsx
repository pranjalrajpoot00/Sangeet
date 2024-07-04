import Header from "../../components/Header";
import { songsData } from "../utils/songsData";
import ListItem from "../../components/ListItem";
import PageContent from "./components/PageContent";

// This page will not be cached, its data will be upto dat
export const revalidate = 0;

export default async function Home() {
  // const songs = await getSongs();
  const songs = songsData;

  return (
    <div className="text-neutral-400 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Hola Amigos!</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          <ListItem image="/images/liked.png" name="Liked Songs" href="#" />
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Latest Hits</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
