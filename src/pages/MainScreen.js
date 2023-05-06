import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Library from "./Library";
import Signin from "./SignIn";
import NewSongs from "./NewSongs";
import MyRecently from "./MyRecently";
import Album from "./Album";
import PlaylistDetail from "./PlaylistDetail";
import Artist from "./Artist";

function MainScreen() {
  return (
    <Routes>
      <Route path="/library" exact Component={Library} />
      <Route path="/" exact Component={Home}></Route>
      <Route path="/signIn" exact Component={Signin} />
      <Route path="/newsongs" exact Component={NewSongs} />
      <Route path="/recently" exact Component={MyRecently} />
      <Route path="/album/*" exact Component={Album} />
      <Route path="/playlistDetail/*" exact Component={PlaylistDetail} />
      <Route path="/artist/*" exact Component={Artist} />
    </Routes>
  );
}

export default MainScreen;
