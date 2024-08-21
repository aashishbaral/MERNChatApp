import axios from "axios";

// const api_url = "http://localhost:3000/api/";

export const API = axios.create({
  baseURL: "/api/",
  headers: {
    "Access-Control-Allow-Origin": "*", // Allow CORS
  },
});

API.interceptors.request.use(
  (config) => {
    // Set the appropriate Content-Type header based on the data type
    if (config.data && config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API.defaults.withCredentials = true;

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "Unauthorized"
    ) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
