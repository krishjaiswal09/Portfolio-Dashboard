export const API = {
  BASE_URL: "http://localhost:5000",
  REFRESH_INTERVAL: 15000, // 15 seconds
};

export const API_ENDPOINTS = {
  getPortfolio: () => `${API.BASE_URL}/api/portfolio`,
};
