import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">🏠 Earmark</Link>
      </div>

      {/* Center: Navigation links */}
      <div className="nav-center">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/listings" className="nav-btn">Listings</Link>
        <Link to="/saved" className="nav-btn">Saved</Link>
        <Link to="/dashboard/overview" className="nav-btn">Dashboard</Link>
      </div>

      {/* Right: Auth actions */}
      <div className="nav-right">
        {token ? (
          <>
            <Link to="/user_profile" className="nav-btn">Profile</Link>
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
