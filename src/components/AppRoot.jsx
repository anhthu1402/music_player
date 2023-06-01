import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import MusicPlayer from "./MusicPlayer";
import AppAppBar from "./AppAppBar";
import Notification from "./Notification";

function AppRoot() {
  return (
    <>
      <div style={{ position: "relative" }}>
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
      </div>
      <div
        style={{
          position: "fixed",
          width: "35vw",
          marginLeft: "30px",
          bottom: "3em",
          zIndex: 3,
        }}
      >
        <Notification />
      </div>
    </>
  );
}

export default AppRoot;
