import React from "react";
import { SearchBar } from "./SearchBar";
import SettingsIcon from "@mui/icons-material/Settings";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

function Header() {
  return (
    <div className="header">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="searchBar">
            <SearchBar />
          </div>
          <div className="personal">
            <button className="settingsBtn">
              <SettingsIcon
                className="icon"
                style={{
                  backgroundColor: `#FFE1E8`,
                  fontSize: `large`,
                  width: `40px`,
                  padding: `3px`,
                  height: `40px`,
                  border: `1px solid transparent`,
                  borderRadius: `20px`,
                }}
              />
            </button>
            <Link to={"/signIn"}>
              <button className="signInBtn">Đăng nhập</button>
            </Link>
          </div>
        </Box>
      </Toolbar>
    </div>
  );
}

export default Header;
