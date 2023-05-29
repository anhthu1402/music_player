import React from "react";
import { SearchBar } from "./SearchBar";
import InputSearch from "./InputSearch";
import SettingsIcon from "@mui/icons-material/Settings";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function Header() {
  return (
    <div className="header">
      <Toolbar>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="searchBar">
            {/* <SearchBar /> */}
            <InputSearch />
          </div>
          <div className="personal">
            <div>
              <Popup
                contentStyle={{
                  zIndex: "2000",
                  position: "fixed",
                  marginTop: 10,
                }}
                arrow={false}
                trigger={
                  <button className="settingsBtn" title="Cài đặt">
                    <SettingsIcon
                      className="icon"
                      sx={{
                        backgroundColor: `#FFE1E8`,
                        fontSize: `large`,
                        width: `2.8vw`,
                        padding: `3px`,
                        height: `2.8vw`,
                        border: `1px solid transparent`,
                        borderRadius: `20px`,
                      }}
                    />
                  </button>
                }
                position={"bottom right"}
                on={"click"}
              >
                <div>Do something here ...</div>
              </Popup>
            </div>
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
