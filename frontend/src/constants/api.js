// API
export const API = {
  BASE_URL: "https://portfolio-dashboard-6o9w.onrender.com",
  ENDPOINTS: {
    PORTFOLIO: "/api/portfolio",
  },
  REFRESH_INTERVAL: 15000, // 15 seconds
};

export const API_ENDPOINTS = {
  getPortfolio: () => `${API.BASE_URL}${API.ENDPOINTS.PORTFOLIO}`,
};
