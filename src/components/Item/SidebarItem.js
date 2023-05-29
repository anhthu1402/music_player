import { useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Sidebar.css";
import SidebarContext from "../../SidebarContext";

export default function SidebarItem({ item }) {
  const sidebar = useContext(SidebarContext);
  return (
    <div
      className="sidebar-item plain"
      style={
        sidebar.pathName === item.title
          ? { backgroundColor: "#FFF0F4" }
          : { backgroundColor: "transparent" }
      }
      onClick={() => {
        sessionStorage.setItem(
          "sidebarPathPrev",
          JSON.stringify(sidebar.pathName)
        );
        sessionStorage.setItem("sidebarPath", JSON.stringify(item.title));
        sidebar.setPathName(item.title);
      }}
    >
      <Link to={item.path} style={{ color: "black" }}>
        <span>
          {item.icon}
          {item.title}
        </span>
      </Link>
    </div>
  );
}
