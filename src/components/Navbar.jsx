import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">🏠 Earmark</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/listings">Listings</Link>
        <Link to="/saved">Saved</Link>
        <Link to="/dashboard/overview">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
