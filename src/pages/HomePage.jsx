import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/home.css";

function HomePage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await api.get("/home");
        setMessage(res.data.message);
      } catch (err) {
        console.error("Failed to load home", err);
      }
    };
    fetchHome();
  }, []);

  return (
    <div className="home-wrapper">
      <div className="home-hero">
        <h1>Welcome to Our Marketplace</h1>
        <p>{message}</p>
      </div>

      <div className="home-actions">
        <a href="/listings" className="home-btn">Browse Listings</a>
        <a href="/saved" className="home-btn">Saved Listings</a>
        <a href="/dashboard/overview" className="home-btn">Dashboard</a>
      </div>
    </div>
  );
}

export default HomePage;
