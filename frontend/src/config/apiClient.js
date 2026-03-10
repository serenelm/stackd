import { API_ROUTES } from "../config/apiConfig";

async function safeFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`request failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchAssets() {
  return safeFetch(API_ROUTES.assets);
}

export async function fetchWellness() {
  return safeFetch(API_ROUTES.wellness);
}

export async function fetchRecommendations() {
  return safeFetch(API_ROUTES.recommendations);
}