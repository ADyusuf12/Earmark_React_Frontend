import { useState } from "react";
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

      setMessage(
        "Registered as " +
          res.data.user.username +
          " (" +
          res.data.profile.account_type +
          ")"
      );
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("user", JSON.stringify(res.data.user));
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
