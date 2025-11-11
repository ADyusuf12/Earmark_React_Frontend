import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    accountType: "customer",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("API base URL:", import.meta.env.VITE_API_BASE_URL);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirmation) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/register", {
        user: {
          username: form.username,
          email: form.email,
          password: form.password,
          password_confirmation: form.passwordConfirmation,
          account_type: form.accountType,
        },
      });

      // Extract JWT from response headers
      const authHeader = res.headers["authorization"];
      const token = authHeader ? authHeader.split(" ")[1] : null;

      setMessage(
        "Registered as " +
        res.data.user.username +
        " (" +
        res.data.profile.account_type +
        ")"
      );

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || "Registration failed"));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
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
          <input
            className="auth-input"
            name="passwordConfirmation"
            type="password"
            placeholder="Confirm Password"
            value={form.passwordConfirmation}
            onChange={handleChange}
          />
          <select
            className="auth-input"
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
          >
            <option value="customer">Customer</option>
            <option value="agent">Agent</option>
            <option value="developer">Developer</option>
            <option value="owner">Owner</option>
          </select>
          <button className="auth-button" type="submit">
            Register
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;
