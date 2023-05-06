import React from "react";
import { Link } from "react-router-dom";
import "../styles/SignIn.css";

function SignIn() {
  return (
    <div className="signinContainer">
      <h1>Đăng nhập</h1>
      <div className="signinGoogle">
        <Link to={"#"}>Tiếp tục với Google</Link>
      </div>
      <p className="dividingLine"><span>HOẶC</span></p>
      <form className="signinForm">
        <div className="div1">
          <p>Email</p>
          <input name="userEmail" type="email" placeholder="example@gmail.com"/>
        </div>
        <div className="div1">
          <p>Mật khẩu</p>
          <input name="userPassword" type="password" placeholder="example@gmail.com"/>
        </div>
        <div className="div3">
          <div>
            <input alignItems='left' type="checkbox" name="rememberAccount"/>
            <p>Nhớ tên tài khoản</p>
          </div>
          <p><Link to={"#"}>Quên mật khẩu?</Link></p>
        </div>
        <input type="submit" name="submitSignin" className="submitSignin" value={"Đăng nhập"}/>
      </form>
    </div>
  );
}

export default SignIn;
