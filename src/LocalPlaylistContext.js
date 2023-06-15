import React, { createContext, useState } from "react";
const LocalPlaylistContext = createContext();
export const LocalPlaylistProvider = ({ children }) => {
  const [open, setOpen] = useState(
    localStorage.getItem("openLocalPlaylist") !== null
      ? JSON.parse(localStorage.getItem("openLocalPlaylist"))
      : false
  );
  return (
    <LocalPlaylistContext.Provider value={{ open, setOpen }}>
      {children}
    </LocalPlaylistContext.Provider>
  );
};
export default LocalPlaylistContext;
