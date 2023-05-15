import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import MusicPlayer from "./MusicPlayer";
import AppAppBar from "./AppAppBar";

function AppRoot() {
  return (
    <>
      <div style={{ width: `260px`, position: `fixed`, top: `0`, left: 0 }}>
        <SideBar />
      </div>
      <div
        style={{
          padding: `20px 50px 0 50px`,
          width: `calc(100% - 260px)`,
          position: `relative`,
          left: `260px`,
          height: `calc(100%-18vh)`,
        }}
      >
        <AppAppBar />
        <div>
          <Outlet />
        </div>
        <div
          className="musicPlayer"
          style={{
            width: `calc(100% - 260px)`,
          }}
        >
          <MusicPlayer />
        </div>
      </div>
    </>
  );
}

export default AppRoot;
