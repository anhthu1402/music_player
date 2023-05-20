import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { MusicPlayerProvider } from "./MusicPlayerContext";
import AppRoot from "./components/AppRoot";
import Home from "./pages/Home";
import Library from "./pages/Library";
import SignIn from "./pages/SignIn";
import NewSongs from "./pages/NewSongs";
import NewRelease from "./pages/NewRelease";
import MyRecently from "./pages/MyRecently";
import Album from "./pages/Album";
import PlaylistDetail from "./pages/PlaylistDetail";
import Artist from "./pages/Artist";
import HomeArtists from "./pages/HomeArtists";
import HomePlaylists from "./pages/HomePlaylists";
import TopRank from "./pages/TopRank";
import Chart from "./pages/Chart";
import AllArtistSongs from "./components/AllArtistSongs";
import AllArtistAlbums from "./components/AllArtistAlbums";

function App() {
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
          path: "home/artists",
          element: <HomeArtists />,
        },
        {
          path: "home/playlists",
          element: <HomePlaylists />,
        },
        {
          path: "charts",
          element: <Chart />,
        },
        {
          path: "top100",
          element: <TopRank />,
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
