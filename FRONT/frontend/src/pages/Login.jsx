import React, { useState, useContext } from "react";
import "../styles/Form.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import { AuthContext } from "../Contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/api/token/", { username: email, password }); //django requires username field, so we set username = email 
      //localStorage.setItem(ACCESS_TOKEN, res.data.access);
      //localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      login(res.data)
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              id="email"
            />
            <PersonIcon className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              id="password"
            />
            <LockIcon className="icon" />
          </div>

          <div className="remember-user">
            <input type="checkbox" id="remember" />
            <span>Remember me</span>
          </div>

          <button type="submit">Login</button>
        </form>
        <div className="redirect">
          <p>
            Don't have an account?{" "}
            <span className="redirect-link">
              <a onClick={() => navigate("/register")}>Register</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;