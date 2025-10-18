import axios from "axios";

// Adjust this to match your Rails API base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
