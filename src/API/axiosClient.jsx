// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";
import config from "../config/index";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: config.URL_SERVER,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  // Get the current route from the window location
  const currentRoute = window.location.pathname;

  // Add the X-Current-Route header to every request
  config.headers["X-Current-Route"] = currentRoute;
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    const status = (error && error.response && error.response.status) || 500;
    switch (status) {
      // authentication (token related issues)
      case 401: {
        toast.error("Unauthorized the user. Please login ...");
        return error.response.data;
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("Your don't have the  permission to access this resource");
        setTimeout(() => {
          window.location.href = "/chat";
        }, 5000);
        return error.response.data;
      }

      // bad request
      case 400: {
        return error.response.data;
      }

      // not found
      case 404: {
        return error.response.data;
      }

      // conflict
      case 409: {
        return error.response.data;
      }

      // unprocessable
      case 422: {
        return error.response.data;
      }
      // generic api error (server related) unexpected
      default: {
        return error.response.data;
      }
    }
    // throw error;
  }
);
export default axiosClient;
