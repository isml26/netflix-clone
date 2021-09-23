import React, { useContext } from "react";
import {login} from "../../context/auth/apiCalls"
import { AuthContext } from "../../context/auth/AuthContext";
import "./login.scss";

function Login() {
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e)=>{
    e.preventDefault();
    login({email,password},dispatch)
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email or phone number" onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
          <button className="loginButton" onClick={handleLogin}>Sign In</button>
          <span>
            New to Netflix? <a href="/register"><b>Sign up now.</b></a>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}

export default Login;
