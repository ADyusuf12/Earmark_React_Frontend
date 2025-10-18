import { useState } from "react";
import api from "../api/axios";
import "../styles/auth.css";

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    accountType: "customer", // default
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", {
        user: {
          username: form.username,
          email: form.email,
          password: form.password,
          password_confirmation: form.passwordConfirmation,
          account_type: form.accountType,
        }
      });

      console.log("Response:", res.data);

      setMessage("Registered as " + res.data.user.username + " (" + res.data.profile.account_type + ")");
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.log("Error response:", err.response);
      setMessage("Error: " + (err.response?.data?.error || "Registration failed"));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" onChange={handleChange} /><br />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} /><br />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
          <input
            name="passwordConfirmation"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          /><br />

          <label>
            Account Type:
            <select name="accountType" value={form.accountType} onChange={handleChange}>
              <option value="customer">Customer</option>
              <option value="agent">Agent</option>
              <option value="developer">Developer</option>
              <option value="owner">Owner</option>
            </select>
          </label>
          <br />

          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default RegisterPage;
