import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
    getDashboardListings,
    deleteDashboardListing,
} from "../../api/axios";
import DashboardListingForm from "../../components/DashboardListingForm";
import "../../styles/dashboard.css";

function DashboardListingsPage() {
    const { token } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [editingListing, setEditingListing] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const fetchListings = async () => {
        try {
            const res = await getDashboardListings(token);
            setListings(res.data);
        } catch (err) {
            console.error("Failed to fetch dashboard listings", err);
        }
    };

    useEffect(() => {
        if (token) fetchListings();
    }, [token]);

    // 👇 check query param on mount
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("new") === "true") {
            // clear any editing listing so form is in "create" mode
            setEditingListing(null);
        }
    }, [location]);

    const handleDelete = async (id) => {
        try {
            await deleteDashboardListing(id, token);
            fetchListings();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <h1>Manage Your Listings</h1>

            <DashboardListingForm
                token={token}
                onSuccess={fetchListings}
                editingListing={editingListing}
                setEditingListing={setEditingListing}
            />

            <div className="dashboard-listings">
                {listings.map((l) => (
                    <div key={l.id} className="dashboard-listing-card">
                        {/* Images */}
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
                            <div className="dashboard-listing-placeholder">
                                No images uploaded
                            </div>
                        )}

                        {/* Content */}
                        <div className="dashboard-listing-content">
                            <h3>{l.title}</h3>
                            <p className="dashboard-price">${l.price}</p>
                            <p className="dashboard-location">{l.location}</p>
                            <p className="dashboard-date">
                                Created: {new Date(l.created_at).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="dashboard-actions">
                            <button onClick={() => setEditingListing(l)}>Edit</button>
                            <button onClick={() => handleDelete(l.id)}>Delete</button>
                            <button onClick={() => navigate(`/listings/${l.id}`)}>
                                Preview Public View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardListingsPage;
