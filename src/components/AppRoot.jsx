import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import MusicPlayer from "./MusicPlayer";
import AppAppBar from "./AppAppBar";
import axios from "axios";

function AppRoot() {
  const [message, setMessage] = useState([]);
  const id = 1;
  useEffect(() => {
    axios.get("/api/getPlaylistById/" + id).then((result) => {
      const playlists = result.data.playlist;
      setMessage(playlists);
    });
  });
  // useEffect(() => {
  //   axios.get("/api/getAllSongs").then((res) => {
  //     const playlists = res.data.songs;
  //     setMessage(playlists);
  //   });
  // });
  return (
    <>
      <div style={{ position: `fixed`, top: `0`, left: 0 }}>
        <SideBar />
      </div>
      <div
        style={{
          padding: `2vw 3vw 0 3vw`,
          width: `calc(100% - 17vw)`,
          position: `relative`,
          left: `17vw`,
          height: `calc(100%-18vh)`,
        }}
      >
        <AppAppBar />
        <div>
          {message.map((item) => (
            <div key={item.id}>{item.playlistName}</div>
          ))}

          <Outlet />
        </div>
        <div
          className="musicPlayer"
          style={{
            width: `calc(100% - 17vw)`,
          }}
        >
          <MusicPlayer />
        </div>
      </div>
    </>
  );
}

export default AppRoot;
