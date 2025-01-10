import { useContext, useRef } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Register from "./Register";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3>JoxaSocial</h3>
          <span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, rem?{" "}
          </span>
        </div>
        <div className="loginRight">
          <h1>LOGIN</h1>

          <form className="loginBox" onSubmit={handleSubmit}>
            <input required type="email" placeholder="email..." ref={email} />
            <input
              required
              type="password"
              placeholder="password..."
              ref={password}
              minLength={6}
            />
            <button type="submit" disabled={isFetching}>
              {isFetching ? <CircularProgress color="white" /> : "Log in"}
            </button>
            <span>Forgot Password?</span>
            <Link to="/register">
              <button className="btn">
                {" "}
                {isFetching ? (
                  <CircularProgress color="white" />
                ) : (
                  "Create a new Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
