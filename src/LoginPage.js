import React, { useState } from "react";
import axios from "axios";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://assignment.stage.crafto.app/login",
        { username, otp }
      );
      const token = response.data.token;
      localStorage.setItem("token", token); // Save token for future API requests
      onLogin(token);
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
