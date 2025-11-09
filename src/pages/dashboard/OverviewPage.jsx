import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getDashboardOverview } from "../../api/axios";
import "../../styles/dashboard.css";

function OverviewPage() {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [recentListings, setRecentListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await getDashboardOverview(token);
        setStats(res.data.stats);
        setRecentListings(res.data.recent_listings);
      } catch (err) {
        console.error("Failed to fetch dashboard overview", err);
      }
    };
    if (token) fetchOverview();
  }, [token]);

  if (!stats) return <p>Loading overview...</p>;

  return (
    <div className="dashboard-wrapper">
      <h1>Dashboard Overview</h1>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>{stats.total_listings}</h2>
          <p>Total Listings</p>
        </div>
        <div className="stat-card">
          <h2>{stats.total_images}</h2>
          <p>Total Images</p>
        </div>
      </div>

      <h2>Recent Listings</h2>
      <div className="dashboard-listings">
        {recentListings.map((l) => (
          <div key={l.id} className="dashboard-listing-card">
            <h3>{l.title}</h3>
            <p>${l.price}</p>
            <p>Created: {new Date(l.created_at).toLocaleDateString()}</p>

            {l.images?.length > 0 ? (
              <div className="dashboard-listing-images">
                {l.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${l.title} image ${idx + 1}`}
                    className="dashboard-listing-image"
                  />
                ))}
              </div>
            ) : (
              <div className="dashboard-listing-placeholder">No images uploaded</div>
            )}
          </div>
        ))}
      </div>


      {/* Actions */}
      <div className="dashboard-actions">
        <button
          className="manage-btn"
          onClick={() => navigate("/dashboard/listings")}
        >
          Manage Listings →
        </button>
        <button
          className="create-btn"
          onClick={() => navigate("/dashboard/listings?new=true")}
        >
          + Create New Listing
        </button>
      </div>
    </div>
  );
}

export default OverviewPage;
