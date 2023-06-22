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
    title: "Top album",
    path: "/topalbum",
    icon: <TrendingUpRounded sx={{ fontSize: "1.7vw" }} />,
  },
  {
    title: "Gần đây",
    path: "/recently?type=song",
    icon: <AccessTimeRounded sx={{ fontSize: "1.7vw" }} />,
  },
];
