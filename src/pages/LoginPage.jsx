import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // hook for navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", {
        user: {
          email: form.email,
          password: form.password,
        },
      });

      // store token + user in context
      login(res.data.access, res.data.user);

      // redirect to home
      navigate("/");

    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || "Login failed"));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="auth-input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button className="auth-button" type="submit">
            Login
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
