import React, { useRef, useState } from "react";
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

function SignIn() {
  const [values, setValues] = useState(false);
  const [isOpenFP, setIsOpenFP] = useState(false);

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

  const signinHandler = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      return setAlertError("Vui lòng điền đầy đủ các thông tin đăng ký!");
    }

    //truy van csdl (tam)
    const check = (username, password) => {
      return 1;
    };

    if (!check(username, password)) {
      return setAlertError("Tên đăng nhập hoặc mật khẩu không chính xác.");
    }

    //sign in successfully
    setError(null);
    setShowAlert(false);
    console.log(username, password);
    navigate("/home");
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
          <FormControlLabel
            control={<Checkbox />}
            label="Nhớ tên tài khoản"
            sx={{ marginLeft: "0.5em" }}
          />
          {/* <p className="signup_forgotpw">
            <div className="forgotPwBtn" onClick={forgotPw}>
              <i>Quên mật khẩu?</i>
            </div>
          </p> */}
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
