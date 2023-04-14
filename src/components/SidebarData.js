import React from "react";
import {
  ExpandMore,
  ExpandLess,
  LibraryMusic,
  HomeRounded,
  MusicNoteRounded,
  PersonRounded,
  PlaylistPlayRounded,
  BarChartRounded,
  TrendingUpRounded,
  NewReleasesRounded,
} from "@mui/icons-material";

export const SidebarData = [
  {
    title: "Thư viện",
    path: "/library",
    icon: <LibraryMusic />,
  },
  {
    title: "Khám phá",
    path: "/home",
    icon: <HomeRounded />,
    iconOpened: <ExpandMore />,
    iconClosed: <ExpandLess />,
    subNav: [
      {
        title: "Bài hát",
        path: "/home/songs",
        icon: <MusicNoteRounded />,
      },
      {
        title: "Nghệ sĩ",
        path: "/home/artists",
        icon: <PersonRounded />,
      },
      {
        title: "Playlist",
        path: "/home/playlists",
        icon: <PlaylistPlayRounded />,
      },
    ],
  },
  {
    title: "Bài hát mới",
    path: "/newSongs",
    icon: <NewReleasesRounded />,
  },
  {
    title: "BXH",
    path: "/charts",
    icon: <BarChartRounded />,
  },
  {
    title: "Top 100",
    path: "/top100",
    icon: <TrendingUpRounded />,
  },
];
