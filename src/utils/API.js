import axios from "axios";

const API = axios.create();
API.defaults.baseURL = 'http://localhost';
API.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("token");
  config.headers["authorization"] = `Bearer ${token}`;
  config.headers["Cache-Control"] = 'no-cache';
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default API;
