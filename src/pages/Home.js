import React from "react";
import MusicPlayer from "../components/MusicPlayer";
import BannerPlaylist from "../components/BannerPlaylist";
function Home() {
  return (
    <div>
      <BannerPlaylist />
      <MusicPlayer />
    </div>
  );
}

export default Home;
