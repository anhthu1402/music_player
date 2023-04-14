import React from "react";
import SidebarItem from "./SidebarItem";
import { SidebarData } from "./SidebarData";
import "../styles/Sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header"></div>
      {SidebarData.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
}

export default SideBar;
