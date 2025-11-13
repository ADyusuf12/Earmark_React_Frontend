import axios from "axios";

// Use Vite env variable or fallback to localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Saved Listings
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

export const getSavedListings = (token) =>
  api.get("/saved_listings", {
    headers: { Authorization: `Bearer ${token}` },
  });

// Dashboard Listings
export const getDashboardListings = (token) =>
  api.get("/dashboard/listings", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createDashboardListing = (formData, token) =>
  api.post("/dashboard/listings", formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  });

export const updateDashboardListing = (id, formData, token) =>
  api.put(`/dashboard/listings/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  });

export const deleteDashboardListing = (id, token) =>
  api.delete(`/dashboard/listings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Dashboard Overview
export const getDashboardOverview = (token) =>
  api.get("/dashboard/overview", {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
