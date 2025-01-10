import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router";

function Register() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        const res = await axios.post(
          "http://localhost:4000/api/auth/register",
          user
        );
        console.log(res.data);

        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
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
          <h1 style={{ marginBottom: "50px" }}>Register</h1>
          <form
            onSubmit={handleSubmit}
            className="loginBox"
            style={{ height: "400px" }}
          >
            <input
              required
              type="text"
              ref={username}
              placeholder="username..."
            />
            <input required type="email" ref={email} placeholder="email..." />
            <input
              required
              type="password"
              ref={password}
              placeholder="password..."
              minLength={6}
            />
            <input
              required
              type="password"
              ref={passwordAgain}
              placeholder="password Again..."
            />
            <button type="submit">Sign Up</button>
            <button
              className="btn"
              onClick={() => navigate("/login")}
              type="button"
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
