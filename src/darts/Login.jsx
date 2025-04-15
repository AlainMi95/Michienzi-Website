import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "darts123") {
      localStorage.setItem("auth", "true");
      navigate("/darts");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="login" style={{ padding: "4rem", textAlign: "center" }}>
      <h2>Login to Access Darts</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <br /><br />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
