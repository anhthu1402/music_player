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
  AccessTimeRounded,
} from "@mui/icons-material";

export const SidebarData = [
  {
    title: "Thư viện",
    path: "/library?type=song",
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
    title: "Mới phát hành",
    path: "/newRelease?type=song",
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
  {
    title: "Gần đây",
    path: "/recently?type=song",
    icon: <AccessTimeRounded />,
  },
];
