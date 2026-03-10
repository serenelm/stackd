import { useEffect, useState } from "react";
import {
  fetchAssets,
  fetchWellness,
  fetchRecommendations
} from "../config/apiClient";

function useDashboardData() {
  const [data, setData] = useState({
    assets: null,
    wellness: null,
    recommendations: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [assets, wellness, recommendations] = await Promise.all([
          fetchAssets(),
          fetchWellness(),
          fetchRecommendations()
        ]);

        if (!cancelled) {
          setData({ assets, wellness, recommendations });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "failed to load dashboard");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

export default useDashboardData;