import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignIn.css";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FcGoogle } from "react-icons/fc";
import { IconButton, Input } from "@mui/material";

function SignUp() {
    const [values, setValues] = useState(false);
    const handleClickShowPassword = () => {
        setValues(!values);
    };

    return (
        <div className="signinContainer">
            <h1>Đăng ký</h1>
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
                <div className="div1">
                    <KeyIcon className="signinIcon" />
                    <div>
                        <p>Nhập lại mật khẩu</p>
                        <Input
                            name="userConfirmPassword"
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
                <input
                    type="submit"
                    name="submitSignin"
                    className="submitSignin"
                    value={`Đăng ký`}
                />
            </form>
        </div>
    );
}

export default SignUp
