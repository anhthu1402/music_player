import "./App.css";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer";
import React from "react";
import { MusicPlayerProvider } from "./MusicPlayerContext";
import MainScreen from "./pages/MainScreen";

function App() {
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
            <div>
              <Header className="header" />
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
