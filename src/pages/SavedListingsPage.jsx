import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getSavedListings } from "../api/axios";
import ListingCard from "../components/ListingCard";
import "../styles/listings.css";

function SavedListingsPage() {
    const { token } = useContext(AuthContext);
    const [savedListings, setSavedListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const res = await getSavedListings(token);
                setSavedListings(res.data);
            } catch (err) {
                console.error("Failed to fetch saved listings", err);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchSaved();
    }, [token]);

    if (!token) return <p>Please log in to view saved listings.</p>;
    if (loading) return <p>Loading saved listings...</p>;
    if (savedListings.length === 0) return <p>No saved listings yet.</p>;

    return (
        <div className="saved-listings-wrapper">
            <h1 className="listings-header">Your Saved Listings</h1>
            <div className="listings-grid">
                {savedListings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        listing={listing}
                        initiallySaved={true} // ✅ all listings here are saved
                    />
                ))}
            </div>
        </div>
    );
}

export default SavedListingsPage;
