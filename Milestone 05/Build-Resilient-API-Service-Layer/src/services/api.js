import axios from "axios";

// ===============================
// 1. Axios Instance
// ===============================
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ===============================
// 2. Request Interceptor
// Automatically attach token
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===============================
// 3. Response Interceptor
// Global error handling
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("401 Unauthorized - handle logout or redirect here");
    }

    if (error.response?.status >= 500) {
      console.error("Server error occurred");
    }

    return Promise.reject(error);
  }
);

// ===============================
// 4. API FUNCTIONS
// ===============================

// Products
export const getProducts = () => api.get("/products");

export const getProductById = (id) => api.get(`/products/${id}`);

// Cart
export const getCart = () => api.get("/carts");

export const updateCart = (data) => api.put("/carts", data);

// User
export const getUser = () => api.get("/users/1");

export const updateUser = (data) => api.put("/users/1", data);

// Default export (optional usage)
export default api;