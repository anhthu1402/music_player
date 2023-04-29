import React from "react";
import BannerPlaylist from "../components/BannerPlaylist";
function Home() {
  return (
    <div style={{ height: `calc(100%-20vh)`, position: `relative` }}>
      <BannerPlaylist />
    </div>
  );
}

export default Home;
