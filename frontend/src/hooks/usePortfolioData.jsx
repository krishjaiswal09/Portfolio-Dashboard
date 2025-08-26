import { useState, useEffect, useMemo } from "react";
import { API_ENDPOINTS, API } from "../constants/api.js";
import {
  enhancePortfolioData,
  calculatePortfolioStats,
  calculateSectorSummaries,
} from "../utils/calculations.js";

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPortfolioData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(API_ENDPOINTS.getPortfolio());

      if (!response.ok) {
        throw new Error("Failed to fetch portfolio data");
      }

      const result = await response.json();

      // Get the actual data from API response
      let data;
      if (result.success && result.data) {
        data = result.data;
      } else if (Array.isArray(result)) {
        data = result;
      } else {
        throw new Error("Invalid data format received from API");
      }

      // Make sure we got an array
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API");
      }

      // Clean up the data - remove invalid/empty rows and header rows
      const cleanData = data.filter(
        (item) =>
          item &&
          item.particulars &&
          item.particulars !== null &&
          item.purchasePrice !== null &&
          item.quantity !== null &&
          item.cmp !== null &&
          !item.particulars.includes("Sector")  
      );

      const enhancedData = enhancePortfolioData(cleanData);

      setPortfolioData(enhancedData);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Portfolio fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Calculate total portfolio numbers (investment, current value, profit/loss)
  const portfolioStats = useMemo(() => {
    return calculatePortfolioStats(portfolioData);
  }, [portfolioData]);

  // Calculate numbers for each sector (tech, finance, etc.)
  const sectorSummaries = useMemo(() => {
    return calculateSectorSummaries(portfolioData);
  }, [portfolioData]);

  useEffect(() => {
    fetchPortfolioData();

    // Auto-refresh every 15 Seconds
    const interval = setInterval(
      fetchPortfolioData,
      API.REFRESH_INTERVAL
    );
    return () => clearInterval(interval);
  }, []);

  return {
    portfolioData,
    portfolioStats,
    sectorSummaries,
    loading,
    error,
    lastUpdated,
    refreshing,
    fetchPortfolioData,
  };
};