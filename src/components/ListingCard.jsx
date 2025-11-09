import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { saveListing, unsaveListing } from "../api/axios";
import "../styles/listings.css";

function ListingCard({ listing }) {
  const { token } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const toggleSave = async (e) => {
    e.stopPropagation(); // prevent card click navigation
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

  return (
    <div
      className="listing-card"
      onClick={() => navigate(`/listings/${listing.id}`)}
      style={{ cursor: "pointer" }}
    >
      {listing.images?.length > 0 && (
        <div className="listing-images">
          {listing.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${listing.title} image ${idx + 1}`}
              className="listing-image"
            />
          ))}
        </div>
      )}

      <div className="listing-content">
        <h2 className="listing-title">{listing.title}</h2>
        <p className="listing-price">${listing.price}</p>
        <p className="listing-location">{listing.location}</p>
        <button
          className={`save-btn ${saved ? "saved" : ""}`}
          onClick={toggleSave}
        >
          {saved ? "Unsave" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default ListingCard;
