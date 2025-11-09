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

// Dashboard Listings API
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

// Dashboard Overview API
export const getDashboardOverview = (token) =>
  api.get("/dashboard/overview", {
    headers: { Authorization: `Bearer ${token}` },
  });
export default api;
