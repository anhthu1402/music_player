import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignIn.css";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Checkbox,
  FormControlLabel,
  IconButton,
  Input,
} from "@mui/material";
import ForgotPassword from "./ForgotPassword";
import { Error, PersonRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { authActions } from "../stores/auth";
import SidebarContext from "../SidebarContext";

function SignIn() {
  const [values, setValues] = useState(false);
  const [isOpenFP, setIsOpenFP] = useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => {
    setValues(!values);
  };
  const forgotPw = () => {
    setIsOpenFP(!isOpenFP);
  };

  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(error !== null ? true : false);

  const setAlertError = (error) => {
    setError(error);
    setShowAlert(true);
  };

  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const sidebar = useContext(SidebarContext);
  const signinHandler = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      return setAlertError("Vui lòng điền đầy đủ các thông tin!");
    }
    // if (!check(username, password)) {
    //   return setAlertError("Tên đăng nhập hoặc mật khẩu không chính xác.");
    // }

    //sign in successfully
    setError(null);
    setShowAlert(false);
    const user = {
      username,
      password,
    };
    dispatch(authActions.setAuth(user));
    navigate("/home");
    localStorage.setItem("sidebarPath", JSON.stringify("Khám phá"));
    sidebar.setPathName("Khám phá");
  };

  return (
    <div className="signinContainer">
      <h1>Đăng nhập</h1>
      <form className="signinForm">
        <div className="div1">
          <PersonRounded className="signinIcon" />
          <div>
            <p>Tên đăng nhập</p>
            <Input name="username" type="text" inputRef={usernameRef} />
          </div>
        </div>
        <div className="div1">
          <KeyIcon className="signinIcon" />
          <div>
            <p>Mật khẩu</p>
            <Input
              name="userPassword"
              placeholder="password"
              type={values ? "text" : "password"}
              inputRef={passwordRef}
            />
          </div>
          <IconButton
            onClick={handleClickShowPassword}
            className="showHideIcon"
          >
            {values ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </div>
        <div className="div3">
          <FormControlLabel control={<Checkbox />} label="Nhớ tên tài khoản" />
          <div className="forgotPwBtn" onClick={forgotPw}>
            <p>
              <i>Quên mật khẩu?</i>
            </p>
          </div>
          {isOpenFP && <ForgotPassword handleClose={forgotPw} />}
        </div>
        {showAlert && (
          <Alert
            icon={<Error fontSize="inherit" />}
            severity="warning"
            sx={{ margin: "20px 0" }}
          >
            {error}
          </Alert>
        )}
        <input
          type="button"
          name="submitSignin"
          className="submitSignin"
          value={`Đăng nhập`}
          onClick={signinHandler}
        />
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontStyle: "italic",
        }}
      >
        <p>
          Chưa có tài khoản?{" "}
          <Link to={"/signUp"} style={{ color: "#ff7394" }}>
            <span> Đăng ký ngay</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
