import React, { useState } from "react";
import "../styles/Form.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/api/user/register/", { username: email, password }); //django requires username field, so we set username = email 
      navigate("/login");
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
          <h1>Register</h1>

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

          <div className="input-box">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              id="confirmPassword"
            />
            <LockIcon className="icon" />
          </div>

          <div className="remember-user">
            <input type="checkbox" id="remember" />
            <span>Remember me</span>
          </div>

          <button type="submit">Register</button>
        </form>
        <div className="redirect">
          <p>
            Already have an account?{" "}
            <span className="redirect-link">
              <a onClick={() => navigate("/login")}>Log in</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;