import { useEffect, useState } from "react";
import api from "../api/axios";
import ListingCard from "../components/ListingCard";
import "../styles/listings.css";

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchListings = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/listings?page=${pageNum}`);
      setListings(res.data.listings);
      setMeta(res.data.meta);
      setPage(pageNum);
    } catch (err) {
      console.error("Failed to fetch listings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(1);
  }, []);

  if (loading) return <p>Loading listings...</p>;

  return (
    <div className="listings-wrapper">
      <h1 className="listings-header">Available Listings</h1>
      <div className="listings-grid">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      <div className="pagination">
        {meta.prev_page && (
          <button onClick={() => fetchListings(page - 1)}>Previous</button>
        )}
        <span>
          Page {meta.current_page} of {meta.total_pages}
        </span>
        {meta.next_page && (
          <button onClick={() => fetchListings(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export default ListingsPage;
