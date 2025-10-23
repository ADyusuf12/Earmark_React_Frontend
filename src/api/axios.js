import axios from "axios";

// Adjust this to match your Rails API base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const saveListing = (listingId, token) =>
  api.post("/saved_listings",
    { listing_id: listingId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const unsaveListing = (listingId, token) =>
  api.delete(`/saved_listings/${listingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
