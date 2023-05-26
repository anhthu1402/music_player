import React, { createContext, useState } from "react";
const SidebarContext = createContext();
export const SidebarProvider = ({ children }) => {
  const [pathName, setPathName] = useState(
    localStorage.getItem("sidebarPath") !== null
      ? JSON.parse(localStorage.getItem("sidebarPath"))
      : ""
  );
  return (
    <SidebarContext.Provider value={{ pathName, setPathName }}>
      {children}
    </SidebarContext.Provider>
  );
};
export default SidebarContext;
