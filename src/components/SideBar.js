import React from "react";
import SidebarItem from "./Item/SidebarItem";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { SidebarData } from "./Data/SidebarData";

function SideBar() {
  return (
    <div className="sidebar">
      <div>
        <Link className="sidebar-header" to={"/home"}>
          <img src={Logo} alt="" />
          <h2>UIT MP3</h2>
        </Link>
      </div>
      {SidebarData.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
}

export default SideBar;
