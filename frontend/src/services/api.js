import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  baseURL: "https://link-manager-webapp.onrender.com",
  withCredentials: true, // Send and receive cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;