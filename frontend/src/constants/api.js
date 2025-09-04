export const API = {
  BASE_URL: "https://portfolio-dashboard-6o9w.onrender.com",
  REFRESH_INTERVAL: 15000, // 15 seconds
};

export const API_ENDPOINTS = {
  getPortfolio: () => `${API.BASE_URL}/api/portfolio`,
};
