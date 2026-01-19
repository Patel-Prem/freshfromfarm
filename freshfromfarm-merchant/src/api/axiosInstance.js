import config from "../config/config";
import axios from "axios";
import { store } from "../app/store"; // Your Redux store
import { setAccessToken, logOut } from "../features/auth/authSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: `${config.API_BASE_URL}`,
  withCredentials: true, // send cookies (for refresh token)
});

// Request: attach token
api.interceptors.request.use(
  (req) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  },
  (error) => {
    console.log("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response: handle errors & token refresh
// api.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle 401: attempt refresh
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/auth/refresh") &&
//       !originalRequest.url.includes("/auth/login") &&
//       !store.getState().auth.isLoggedOut
//     ) {
//       console.log("axios interceptor");
//       originalRequest._retry = true;
//       try {
//         const res = await axios.post(
//           "http://localhost:8080/api/auth/refresh",
//           {},
//           { withCredentials: true }
//         );
//         const newToken = res.data.accessToken;
//         store.dispatch(setAccessToken(newToken));
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return api(originalRequest);
//       } catch (refreshErr) {
//         store.dispatch(logOut());
//         toast.error("Session expired. Please log in again.");
//         return Promise.reject(refreshErr);
//       }
//     }

//     const resData = error?.response?.data;
//     if (Array.isArray(resData?.message)) {
//       // Handle: message is an array of strings
//       resData.message.forEach((msg) => toast.error(msg));
//     } else if (typeof resData?.message === "string") {
//       // Handle: message is a single string
//       toast.error(resData.message);
//     } else {
//       // Generic fallback
//       toast.error("An error occurred. Please try again.");
//     }
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (res) => {
    const resData = res?.data;

    // ✅ Automatically show toast on success if `status` or `success` is true and a message exists
    if ((resData?.status || resData?.success) && resData?.message) {
      toast.success(resData.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }

    return res; // Important — still return the response
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle refresh token (401)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh") &&
      !originalRequest.url.includes("/auth/login") &&
      !store.getState().auth.isLoggedOut
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newToken = res.data.accessToken;
        store.dispatch(setAccessToken(newToken));
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        store.dispatch(logOut());
        toast.error("Session expired. Please log in again.");
        return Promise.reject(refreshErr);
      }
    }

    // 🔴 Handle all error messages globally
    const resData = error?.response?.data;
    if (Array.isArray(resData?.message)) {
      resData.message.forEach((msg) => toast.error(msg));
    } else if (typeof resData?.message === "string") {
      toast.error(resData.message);
    } else {
      toast.error("An error occurred. Please try again.");
    }

    return Promise.reject(error);
  }
);


export default api;

// // Helper function for making API requests
// const api = async (url, options) => {
//   var toastEmitter = {
//     position: "top-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//     // transition: Bounce,
//   };

//   const isFormData = options.body instanceof FormData;

//   return fetch(`${config.API_BASE_URL}api${url}`, {
//     ...options,
//     credentials: "include", // Includes cookies if needed
//     headers: isFormData
//       ? {
//           Accept: "application/json",
//           //   ...options.headers, // Merge any additional headers
//         }
//       : {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           //   ...options.headers, // Merge any additional headers
//         },
//   })
//     .then(async (response) => {
//       const data = await response.json();
//       if (!response.ok) {
//         const messages = Array.isArray(data.message)
//           ? data.message
//           : [data.message];
//         messages.forEach((msg) => toast.error(msg, toastEmitter));
//       } else {
//         return data;
//       }
//     })
//     .catch((error) => {
//       toast.error(`${error} `, toastEmitter);
//     });
// };

// const APIService = {
//   // authentication -> SignIn.js
//   login: (userData) => {
//     return api("/auth/login", {
//       method: "POST",
//       body: JSON.stringify({
//         user: userData,
//       }),
//     });
//   },

//   // registeruser -> SignUp.js
//   register: (userData) => {
//     return api("/auth/register", {
//       method: "POST",
//       body: JSON.stringify({
//         user: userData,
//       }),
//     });
//   },

//   // refreshToken
//   refreshToken: () => {
//     console.log('refreshToken called')
//     return api("/auth/refresh", {
//       method: "POST",
//     });
//   },

//    // authentication -> SignOut
//    signOut: () => {
//     return api("/auth/signOut", {
//       method: "POST",
//       // body: JSON.stringify({
//       //   user: userData,
//       // }),
//     });
//   },

//   // get the list of all produce and details listed by the merchant.
//   getProduceDetails: (search) => {
//     return api("/produce/getProduceList", {
//       method: "POST",
//       body: JSON.stringify({
//         keyWords: search,
//       }),
//     });
//   },

//   // List (Add) Produce
//   listProduce: (formData) => {
//     return api("/produce/add", {
//       method: "POST",
//       body: formData,
//     });
//   },

//   // List (Delete) Produce
//   deleteProduce: (id) => {
//     return api("/produce/delete", {
//       method: "DELETE",
//       body: JSON.stringify({
//         produceId: id,
//       }),
//     });
//   },
// };

// export default APIService;
