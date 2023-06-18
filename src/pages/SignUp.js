import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignIn.css";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, IconButton, Input } from "@mui/material";
import { Error, PersonRounded } from "@mui/icons-material";
import { useRef } from "react";

function SignUp() {
  const [values, setValues] = useState(false);
  const handleClickShowPassword = () => {
    setValues(!values);
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
  const passwordConfirmRef = useRef();

  const signupHandler = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if (!username || !password || !passwordConfirm) {
      return setAlertError("Vui lòng điền đầy đủ các thông tin đăng ký!");
    }

    if (password.length < 8 || password.length > 20) {
      return setAlertError("Độ dài mật khẩu phải từ 8 đến 20 ký tự!");
    }
    if (
      !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/)
    ) {
      return setAlertError(
        "Mật khẩu phải chứa ít nhất 1 kí tự thường, 1 kí tự viết hoa, 1 kí tự đặc biệt và chữ số."
      );
    }
    if (password !== passwordConfirm) {
      return setAlertError("Mật khẩu xác nhận không khớp!");
    }
    // sign up successfully
    setError(null);
    setShowAlert(false);
    console.log(username, password, passwordConfirm);
    navigate("/signIn");
  };

  return (
    <div className="signinContainer">
      <h1>Đăng ký</h1>
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
        <div className="div1">
          <KeyIcon className="signinIcon" />
          <div>
            <p>Nhập lại mật khẩu</p>
            <Input
              name="userConfirmPassword"
              type={values ? "text" : "password"}
              inputRef={passwordConfirmRef}
            />
          </div>
          <IconButton
            onClick={handleClickShowPassword}
            className="showHideIcon"
          >
            {values ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
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
          value={`Đăng ký`}
          onClick={signupHandler}
        />
      </form>
      <div
        style={{
          // display: "flex",
          // justifyContent: "center",
          paddingBottom: "20px",
          fontStyle: "italic",
        }}
      >
        <p>
          Đã có tài khoản?{" "}
          <Link to={"/signIn"} style={{ color: "#ff7394" }}>
            <span> Đăng nhập ngay</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
