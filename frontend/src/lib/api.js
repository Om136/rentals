import axios from "axios";

const devFallbackBaseUrl = "http://localhost:5000";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? devFallbackBaseUrl : "");

export const api = axios.create({
  baseURL,
});
