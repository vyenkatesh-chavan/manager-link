import axios from "axios";

const api = axios.create({
 
  baseURL: "https://manager-link-ic17.onrender.com",
  withCredentials: true, // Send and receive cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
