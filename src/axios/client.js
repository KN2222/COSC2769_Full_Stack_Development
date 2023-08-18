import axios from "axios";

export const APIService = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setUpInterceptors = (instance, token) => {
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject({
        message: error.response?.data.message,
        status: error.response?.status,
      });
    }
  );
};
