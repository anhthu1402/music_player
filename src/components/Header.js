import React from "react";
import InputSearch from "./InputSearch";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Toolbar } from "@mui/material";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRef } from "react";
import { EditOutlined, LogoutOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";
import SidebarContext from "../SidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../stores/auth";
import { showNotification } from "../service";

function Header() {
  const modifyRef = useRef();
  const closeModifyPopup = () => modifyRef.current.close();
  const openModifyPopup = () => modifyRef.current.open();
  const logoutRef = useRef();
  const closeLogoutPopup = () => logoutRef.current.close();
  const openLogoutPopup = () => logoutRef.current.open();
  const [disabled, setDisabled] = useState(false);
  const nameRef = useRef();
  const notification = useContext(NotificationContext);
  const sidebar = useContext(SidebarContext);
  const navigate = useNavigate();

  const { isAuthed, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(authActions.logout(user));
    navigate("/home");
  };
  const password = isAuthed ? user.password : "";
  const [username, setName] = useState(isAuthed ? user.username : "");
  const changeUserName = (name) => {
    const newUser = {
      name,
      password,
    };
    setName(name);
    dispatch(authActions.setAuth(newUser));
    showNotification(notification, "Cập nhật tên người dùng thành công");
    closeModifyPopup();
  };
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
            {!isAuthed ? (
              <Link to={"/signIn"}>
                <button className="signInBtn">Đăng nhập</button>
              </Link>
            ) : (
              <div>
                <Popup
                  contentStyle={{
                    zIndex: "10",
                    width: "18%",
                    padding: 0,
                  }}
                  trigger={
                    <h5 className="userName" style={{ color: "black" }}>
                      {username}
                    </h5>
                  }
                  position={"bottom right"}
                >
                  <div className="playlistItemPopup" onClick={openModifyPopup}>
                    <EditOutlined
                      fontSize="small"
                      sx={{ color: "grey", marginRight: 1 }}
                    />
                    <p>Đổi tên</p>
                  </div>
                  <div className="playlistItemPopup" onClick={openLogoutPopup}>
                    <LogoutOutlined
                      fontSize="small"
                      sx={{ color: "grey", marginRight: 1 }}
                    />
                    <p>Đăng xuất</p>
                  </div>
                </Popup>
                <Popup
                  ref={logoutRef}
                  modal
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
                        onClick={closeLogoutPopup}
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
                          closeLogoutPopup();
                          navigate("/home");
                          sidebar.setPathName("Khám phá");
                          handleSignOut();
                        }}
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  </div>
                </Popup>
                <Popup
                  ref={modifyRef}
                  contentStyle={{
                    zIndex: "11",
                    borderRadius: "10px",
                    padding: "20px",
                    width: "25%",
                  }}
                  onClose={() => setDisabled(false)}
                  modal
                  nested
                >
                  <div className="modal">
                    <p
                      onClick={closeModifyPopup}
                      style={{
                        textAlign: "right",
                        marginRight: 5,
                        cursor: "pointer",
                      }}
                    >
                      X
                    </p>
                    <div className="content" style={{ textAlign: "center" }}>
                      <div>
                        <h2 style={{ marginBottom: "20px" }}>
                          Chỉnh sửa tên người dùng
                        </h2>
                      </div>
                      <TextField
                        required
                        onChange={(e) => {
                          nameRef.current.value = e.target.value;
                          if (nameRef.current.value === "") setDisabled(true);
                          else setDisabled(false);
                        }}
                        inputRef={nameRef}
                        placeholder="Nhập tên người dùng"
                        defaultValue={username}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          changeUserName(nameRef.current.value);
                        }}
                        disabled={disabled}
                        sx={{
                          backgroundColor: "#ff7394",
                          ":hover": {
                            backgroundColor: "rgb(244, 161, 175)",
                          },
                        }}
                      >
                        Lưu
                      </Button>
                    </div>
                  </div>
                </Popup>
              </div>
            )}
          </div>
        </Box>
      </Toolbar>
    </div>
  );
}

export default Header;
