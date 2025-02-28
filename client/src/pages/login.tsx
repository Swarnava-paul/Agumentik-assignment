import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage:React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestBody = { email, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const {message,token} = await response.json();
    
      if (!response.ok) {
        throw new Error(message);
      }
      else {
        localStorage.setItem('token',token);
        navigate('/')
      }
    } catch (err) {
      setError(err.message);
      
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        {error && <p className="error">{error}</p>}
        
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

