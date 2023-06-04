import { useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Sidebar.css";
import SidebarContext from "../../SidebarContext";
import { useRef } from "react";
import Popup from "reactjs-popup";
import { Button } from "@mui/material";

export default function SidebarItem({ item }) {
  const popupRef = useRef();
  const openPopup = () => popupRef.current.open();
  const closePopup = () => popupRef.current.close();
  const userId = 1;
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
        if (item.title === "Thư viện") {
          if (userId !== 1) {
            openPopup();
          }
        }
      }}
    >
      <Link to={item.path} style={{ color: "black" }}>
        <span>
          {item.icon}
          {item.title}
        </span>
      </Link>
      <Popup
        ref={popupRef}
        contentStyle={{
          zIndex: "11",
          borderRadius: "10px",
          padding: "25px 30px",
          width: "40%",
        }}
      >
        <div>
          <h2>Thưởng thức thư viện</h2>
          <p style={{ margin: "10px 0" }}>
            Đăng nhập hoặc đăng ký trở thành thành viên của UIT MP3 để xem được
            các bài hát, playlist đã lưu trong thư viện.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Link to={"/home"}>
              <Button
                variant="contained"
                color="inherit"
                sx={{
                  color: "white",
                  marginRight: "30px",
                  ":hover": {
                    backgroundColor: "lightgray",
                  },
                }}
                onClick={() => {
                  sessionStorage.setItem(
                    "sidebarPathPrev",
                    JSON.stringify(sidebar.pathName)
                  );
                  sessionStorage.setItem(
                    "sidebarPath",
                    JSON.stringify("Khám phá")
                  );
                  sidebar.setPathName("Khám phá");
                  closePopup();
                }}
              >
                Để sau
              </Button>
            </Link>
            <Link to={"/signIn"}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff7394",
                  ":hover": {
                    backgroundColor: "rgb(244, 161, 175)",
                  },
                }}
                onClick={(e) => {
                  closePopup();
                }}
              >
                Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </Popup>
    </div>
  );
}
