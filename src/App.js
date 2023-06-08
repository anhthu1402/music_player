import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { MusicPlayerProvider } from "./MusicPlayerContext";
import AppRoot from "./components/AppRoot";
import Home from "./pages/Home";
import Library from "./pages/Library";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NewRelease from "./pages/NewRelease";
import MyRecently from "./pages/MyRecently";
import Album from "./pages/Album";
import PlaylistDetail from "./pages/PlaylistDetail";
import Artist from "./pages/Artist";
import TopRank from "./pages/TopRank";
import Chart from "./pages/Chart";
import AllArtistSongs from "./components/AllArtistSongs";
import AllArtistAlbums from "./components/AllArtistAlbums";
import NavBarPlaylist from "./components/NavBarPlaylist";

function App() {
  window.onbeforeunload = localStorage.setItem("play", JSON.stringify(false));
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppRoot />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "library",
          element: <Library />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "signIn",
          element: <SignIn />,
        },
        {
          path: "signUp",
          element: <SignUp />,
        },
        {
          path: "newRelease",
          element: <NewRelease />,
        },
        {
          path: "recently",
          element: <MyRecently />,
        },
        {
          path: "album/*",
          element: <Album />,
        },
        {
          path: "playlistDetail/*",
          element: <PlaylistDetail />,
        },
        {
          path: "artist/*",
          element: <Artist />,
        },
        {
          path: ":name/songs",
          element: <AllArtistSongs />,
        },
        {
          path: ":name/albums",
          element: <AllArtistAlbums />,
        },
        {
          path: "charts",
          element: <Chart />,
        },
        {
          path: "top100",
          element: <TopRank />,
        },
        {
          path: "navbarPlaylist",
          element: <NavBarPlaylist />,
        },
      ],
    },
  ]);
  return (
    <MusicPlayerProvider>
      <RouterProvider router={router} />
    </MusicPlayerProvider>
  );
}

export default App;
