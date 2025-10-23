import "../styles/listings.css";

function ListingShowCard({ listing, saved, toggleSave, token, onUserClick }) {
  return (
    <div className="listing-show-card">
      <div className="listing-show-header">
        <h1 className="listing-show-title">{listing.title}</h1>
        {token && (
          <button
            className={`save-btn ${saved ? "saved" : ""}`}
            onClick={toggleSave}
          >
            {saved ? "Unsave" : "Save"}
          </button>
        )}
      </div>

      <p className="listing-show-description">{listing.description}</p>

      <div className="listing-show-meta">
        <p><strong>Price:</strong> ${listing.price}</p>
        <p><strong>Location:</strong> {listing.location}</p>
      </div>

      <div className="listing-show-images">
        {listing.images.map((img, idx) => (
          <img key={idx} src={img} alt={`Listing ${idx}`} />
        ))}
      </div>

      <div className="listing-show-user">
        Posted by:{" "}
        <span className="username-link" onClick={onUserClick}>
          {listing.user.username}
        </span>
      </div>
    </div>
  );
}

export default ListingShowCard;
