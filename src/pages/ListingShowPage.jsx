import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { saveListing, unsaveListing } from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import ListingShowCard from "../components/ListingShowCard";
import "../styles/listings.css";

function ListingShowPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setListing(res.data);

        if (token) {
          const savedRes = await api.get("/saved_listings", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const savedIds = savedRes.data.map((l) => l.id);
          setSaved(savedIds.includes(parseInt(id)));
        }
      } catch (err) {
        console.error("Failed to fetch listing", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id, token]);

  const toggleSave = async () => {
    try {
      if (saved) {
        await unsaveListing(listing.id, token);
        setSaved(false);
      } else {
        await saveListing(listing.id, token);
        setSaved(true);
      }
    } catch (err) {
      console.error("Save/Unsave failed", err);
    }
  };

  if (loading) return <p>Loading listing...</p>;
  if (!listing) return <p>Listing not found</p>;

  return (
    <div className="listing-show-wrapper">
      <ListingShowCard
        listing={listing}
        saved={saved}
        toggleSave={toggleSave}
        token={token}
        onUserClick={() => navigate(`/user_profiles/${listing.user.id}`)}
      />
      <button className="back-btn" onClick={() => navigate("/listings")}>
        ← Back to Listings
      </button>
    </div>
  );
}

export default ListingShowPage;
