import axios from "axios";

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${token}`
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVER,
  headers: headers
});

export default axiosInstance;
