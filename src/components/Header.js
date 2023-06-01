import React from "react";
import InputSearch from "./InputSearch";
import SettingsIcon from "@mui/icons-material/Settings";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { Box, Button, Toolbar } from "@mui/material";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRef } from "react";

function Header() {
  const deleteRef = useRef();
  const closeDeletePopup = () => deleteRef.current.close();
  const openDeletePopup = () => deleteRef.current.open();
  //tạm
  const userId = 1;
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
            <InputSearch />
          </div>
          <div className="personal">
            {userId === 2 ? (
              <Link to={"/signIn"}>
                <button className="signInBtn">Đăng nhập</button>
              </Link>
            ) : (
              <Popup
                ref={deleteRef}
                trigger={<button className="signInBtn">Đăng xuất</button>}
                modal
                lockScroll={true}
                contentStyle={{
                  zIndex: "11",
                  borderRadius: "10px",
                  padding: "25px 30px",
                  width: "40%",
                }}
              >
                <div>
                  <h2>Đăng xuất</h2>
                  <p style={{ margin: "10px 0" }}>
                    Bạn có chắc chắn muốn đăng xuất khỏi UIT MP3?
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        marginRight: "30px",
                        ":hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                      onClick={closeDeletePopup}
                    >
                      Không
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff7394",
                        ":hover": {
                          backgroundColor: "rgb(244, 161, 175)",
                        },
                      }}
                      onClick={(e) => {
                        closeDeletePopup();
                      }}
                    >
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              </Popup>
            )}
          </div>
        </Box>
      </Toolbar>
    </div>
  );
}

export default Header;
