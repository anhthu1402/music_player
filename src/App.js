import "./App.css";
import SideBar from "./components/SideBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Header from "./components/Header";
import Signin from "./pages/SignIn";
import NewSongs from "./pages/NewSongs";
import MyRecently from "./pages/MyRecently";
import Album from "./pages/Album";
import MusicPlayer from "./components/MusicPlayer";
import React from "react";
import { MusicPlayerProvider } from "./MusicPlayerContext";
import MusicPlayerContext from "./MusicPlayerContext";
import { useContext } from "react";

function App() {
  const musicPlayer = useContext(MusicPlayerContext);
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
              marginBottom: `18vh`,
            }}
          >
            <Header className="header" />
            <Routes>
              <Route path="/library" exact Component={Library}></Route>
              <Route path="/" exact Component={Home}></Route>
              <Route path="/signIn" exact Component={Signin} />
              <Route path="/newsongs" exact Component={NewSongs} />
              <Route path="/recently" exact Component={MyRecently} />
              <Route path="/album/*" exact Component={Album} />
            </Routes>
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
