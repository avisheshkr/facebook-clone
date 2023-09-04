import { useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      password.current.value !== confirmPassword.current.value &&
        password.current.setCustomValidity("Passwords do not match.");

      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, user);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register__main">
        <div className="register__left">
          <h1>Office-Hub</h1>
          <h2>
            Connect with friends and the colleagues around you on Office-Hub
          </h2>
        </div>
        <div className="register__right">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username"></label>
              <input
                type="text"
                placeholder="Username"
                ref={username}
                required
              />
            </div>
            <div>
              <label htmlFor="email"></label>
              <input type="email" placeholder="Email" ref={email} required />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                placeholder="Password"
                ref={password}
                required
                minLength={6}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword"></label>
              <input
                type="password"
                placeholder="Password Again"
                ref={confirmPassword}
                required
                minLength={6}
              />
            </div>
            <button type="submit">Sign up</button>
          </form>
          <Link to="/login">
            <button className="register__login">Log into Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
