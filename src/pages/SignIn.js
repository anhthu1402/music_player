import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignIn.css";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FcGoogle } from "react-icons/fc";
import { IconButton, Input } from "@mui/material";

function SignIn() {
  const [values, setValues] = useState(false);

  const handleClickShowPassword = () => {
    setValues(!values);
  };
  return (
    <div className="signinContainer">
      <h1>Đăng nhập</h1>
      <div className="signinGoogle">
        <FcGoogle className="signinIcon" size={25} />
        <p>
          <Link to={"#"}>Tiếp tục với Google</Link>
        </p>
      </div>
      <p className="dividingLine">
        <span>HOẶC</span>
      </p>
      <form className="signinForm" method="POST">
        <div className="div1">
          <EmailIcon className="signinIcon" />
          <div>
            <p>Email</p>
            <Input
              name="userEmail"
              type="email"
              placeholder="example@gmail.com"
            />
          </div>
        </div>
        <div className="div1">
          <KeyIcon className="signinIcon" />
          <div>
            <p>Mật khẩu</p>
            <Input
              name="userPassword"
              placeholder="example@gmail.com"
              type={values ? "text" : "password"}
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
          <div>
            <input alignItems="left" type="checkbox" name="rememberAccount" />
            <p>Nhớ tên tài khoản</p>
          </div>
          <p>
            <Link to={"#"}>Quên mật khẩu?</Link>
          </p>
        </div>
        <input
          type="submit"
          name="submitSignin"
          className="submitSignin"
          value={`Đăng nhập`}
        />
      </form>
    </div>
  );
}

export default SignIn;
