import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to add acccess token
axiosInstance.interceptors.request.use(
  // if no errors
  (config) => {
    const token = localStorage.getItem("accesToken") || "";
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error), // in case of  error simply reject the promise
);

// response interceptor to handle token refresh

axiosInstance.interceptors.response.use(
  // if no error simply return the response
  (response) => response,
  // in case of errors

  async (error) => {
    const originalRequest = error.config;
    // if 401 unauthorized error and not already retried

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      //atempt to refresh token
      try {
        // request new access token
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "https://api.freeapi.app/api/v1/users/refresh-token",
          { refreshToken },
        );
        const { accessToken } = response.data.data;
        // update localStorage and axiosInstance headers
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`; // like line 15 but another sorted method for it
        //send original request again
        return axiosInstance(originalRequest);
      } catch (error) {
        window.location.href = "/login";

        // clear tokens on failure
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
