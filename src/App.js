import "./App.css";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer";
import React from "react";
import { MusicPlayerProvider } from "./MusicPlayerContext";
import MainScreen from "./pages/MainScreen";
import AppBar from "./components/AppBar";
import { CssBaseline, useScrollTrigger } from "@mui/material";
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
  });
}
function App(props) {
  return (
    <MusicPlayerProvider>
      <div>
        <Router>
          <div style={{ width: `260px`, position: `fixed`, top: `0`, left: 0 }}>
            <SideBar />
          </div>
          <div
            style={{
              padding: `20px 50px`,
              width: `calc(100% - 260px)`,
              position: `relative`,
              left: `260px`,
              height: `calc(100%-18vh)`,
            }}
          >
            <div className="appBarHeader">
              <CssBaseline />
              <ElevationScroll {...props}>
                <AppBar
                  className="appBar"
                  position="fixed"
                  style={{
                    width: `calc(100% - 260px)`,
                    padding: `20px`,
                    backgroundColor: "white",
                  }}
                >
                  <Header className="header" />
                </AppBar>
              </ElevationScroll>
            </div>
            <div className="mainscreen">
              <MainScreen />
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
        </Router>
      </div>
    </MusicPlayerProvider>
  );
}

export default App;
