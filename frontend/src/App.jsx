import React from "react";
import { usePortfolioData } from "./hooks/usePortfolioData.jsx";
import DashboardHeader from "./components/DashboardHeader.jsx";
import PortfolioSummary from "./components/PortfolioSummary.jsx";
import SectorSummary from "./components/SectorSummary.jsx";
import PortfolioTable from "./components/PortfolioTable.jsx";

const App = () => {
  // Get all the portfolio data and functions
  const {
    portfolioData, // All your stocks with profit/loss calculations
    portfolioStats, // Total numbers for your whole portfolio
    sectorSummaries, // How each sector (tech, finance, etc.) is doing
    loading, // True when loading for the first time
    error, // Error message if something goes wrong
    lastUpdated, // When we last got fresh data
    refreshing, // True when refreshing data
    fetchPortfolioData, // Function to manually refresh data
  } = usePortfolioData();
  
  // Show loading spinner when first opening the app
  const Loading = ({ message = "Loading..." }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">{message}</p>
        </div>
      </div>
    );
  };

  if (loading && !portfolioData.length) {
    return <Loading message="Loading portfolio data..." />;
  }

  // Show simple error message if data failed to load
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-red-800 font-semibold mb-2">
            Couldn't Load Portfolio
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPortfolioData}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <DashboardHeader
        lastUpdated={lastUpdated}
        refreshing={refreshing}
        onRefresh={fetchPortfolioData}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <PortfolioSummary portfolioStats={portfolioStats} />

        <SectorSummary sectorSummaries={sectorSummaries} />

        <PortfolioTable
          portfolioData={portfolioData}
          portfolioStats={portfolioStats}
        />
      </div>
    </div>
  );
};

export default App;
