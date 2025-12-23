import axios from "axios";

const devFallbackBaseUrl = "http://localhost:5000";

const normalizeBaseUrl = (value) => {
  if (!value) return "";
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  // If someone sets just `rentals-production.up.railway.app`, treat as https URL
  return `https://${trimmed}`;
};

const baseURL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)
  || (import.meta.env.DEV ? devFallbackBaseUrl : "");

export const api = axios.create({
  baseURL,
});
