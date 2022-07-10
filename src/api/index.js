import axios from "axios";
import store from "@/store";
import router from "@/router";

const apiConfig = {
  baseURL: process.env.VUE_APP_API_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const token = localStorage.getItem("token");
if (token) apiConfig.headers["authorization"] = `Bearer ${token}`;

export const AuthAPIInstance = axios.create(apiConfig);
export const APIInstance = axios.create(apiConfig);

APIInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response.data);
    if (error.response.status === 401) {
      store.dispatch("AuthModule/onLogout");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);
