import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login-container">
      <div className="login__main">
        <div className="login__left">
          <h1>Office-Hub</h1>
          <h2>
            Connect with friends and the colleagues around you on Office-Hub
          </h2>
        </div>
        <div className="login__right">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email"></label>
              <input type="email" placeholder="Email" ref={email} required />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                placeholder="Password"
                minLength="6"
                ref={password}
                required
              />
            </div>
            <button type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="17px" />
              ) : (
                "Log in"
              )}
            </button>
          </form>
          <a href="/">forgot password?</a>
          <Link to="/register">
            <button className="login__create">Create a New Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
