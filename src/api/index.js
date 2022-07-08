import axios from "axios";

const apiConfig = {
  baseURL: process.env.VUE_APP_API_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const token = localStorage.getItem("token")
if (token) apiConfig.headers["authorization"] = `Bearer ${token}`;

export const APIInstance = axios.create(apiConfig)