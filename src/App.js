import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { MusicPlayerProvider } from "./MusicPlayerContext";
import AppRoot from "./components/AppRoot";
import Home from "./pages/Home";
import Library from "./pages/Library";
import SignIn from "./pages/SignIn";
import NewSongs from "./pages/NewSongs";
import MyRecently from "./pages/MyRecently";
import Album from "./pages/Album";
import PlaylistDetail from "./pages/PlaylistDetail";
import Artist from "./pages/Artist";

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
          path: "newsongs",
          element: <NewSongs />,
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
