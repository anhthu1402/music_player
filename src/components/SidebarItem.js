import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);

  if (item.subNav) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            <Link
              className="sidebar-link"
              to={item.path}
              style={{ textDecoration: `none`, color: `black` }}
            >
              {item.icon}
              {item.title}
            </Link>
          </span>
          <i
            className="toogle-button"
            style={{ cursor: `pointer` }}
            onClick={() => setOpen(!open)}
          >
            {!open ? item.iconOpened : item.iconClosed}
          </i>
        </div>
        <div className="sidebar-content">
          {item.subNav.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <a href={item.path || "#"} className="sidebar-item plain">
        <span>
          {item.icon}
          {item.title}
        </span>
      </a>
    );
  }
}
