import React from "react";
import {
  ExpandMore,
  ExpandLess,
  LibraryMusic,
  HomeRounded,
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
    icon: <LibraryMusic sx={{ fontSize: "1.7vw" }} />,
  },
  {
    title: "Khám phá",
    path: "/home",
    icon: <HomeRounded sx={{ fontSize: "1.7vw" }} />,
    iconOpened: <ExpandMore sx={{ fontSize: "1.7vw" }} />,
    iconClosed: <ExpandLess sx={{ fontSize: "1.7vw" }} />,
    subNav: [
      {
        title: "Nghệ sĩ",
        path: "/home/artists",
        icon: <PersonRounded sx={{ fontSize: "1.7vw" }} />,
      },
      {
        title: "Playlist",
        path: "/home/playlists",
        icon: <PlaylistPlayRounded sx={{ fontSize: "1.7vw" }} />,
      },
    ],
  },
  {
    title: "Mới phát hành",
    path: "/newRelease?type=song",
    icon: <NewReleasesRounded sx={{ fontSize: "1.7vw" }} />,
  },
  {
    title: "BXH",
    path: "/charts",
    icon: <BarChartRounded sx={{ fontSize: "1.7vw" }} />,
  },
  {
    title: "Top 100",
    path: "/top100",
    icon: <TrendingUpRounded sx={{ fontSize: "1.7vw" }} />,
  },
  {
    title: "Gần đây",
    path: "/recently?type=song",
    icon: <AccessTimeRounded sx={{ fontSize: "1.7vw" }} />,
  },
];
