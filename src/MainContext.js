import React from "react";
import NotificationContext from "./NotificationContext";
import { useContext } from "react";
import MusicPlayerContext from "./MusicPlayerContext";
import TrackItem from "./components/Item/TrackItem";

const MainContext = (props) => {
  const musicplayer = useContext(MusicPlayerContext);
  const notification = useContext(NotificationContext);
};

export default MainContext;
