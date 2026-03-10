const DEFAULT_BASE_URL = "http://localhost:4000";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_BASE_URL;

export const API_ROUTES = {
  assets: `${API_BASE_URL}/api/assets`,
  wellness: `${API_BASE_URL}/api/wellness`,
  recommendations: `${API_BASE_URL}/api/recommendations`
};