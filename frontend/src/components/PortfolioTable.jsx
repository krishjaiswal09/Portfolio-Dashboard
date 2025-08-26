import React, { useState } from "react";
import { TrendingUp, TrendingDown, Filter, ChevronDown } from "lucide-react";
import { formatCurrency, formatNumber } from "../utils/formatters";

const PortfolioTable = ({ portfolioData, portfolioStats }) => {
  const [selectedSector, setSelectedSector] = useState("Financial Sector");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

const stocks = portfolioStats.dataWithPortfolioPercent;

  if(!stocks || stocks.length === 0){
    return (
      <div className="min-h-[200px] flex items-center justify-center bg-white rounded-xl shadow-sm border">
        <p className="text-gray-600">No Portfolio data available.</p>
      </div>
    )
  }

  const sectors = [...new Set(stocks.map(stock => stock.sector).filter(Boolean))].sort();
  const filteredStocks = selectedSector ? stocks.filter(stock => stock.sector === selectedSector) : stocks;

  const handleSectorSelect = (sector) => {
    setSelectedSector(sector);
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      {/* Header with Filter */}
      <div className="px-6 py-4 border-b bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Holdings Details</h2>
          
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              {selectedSector || "All Sectors"}
              <ChevronDown className="w-4 h-4" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
                {sectors.map(sector => (
                  <div
                    key={sector}
                    onClick={() => handleSectorSelect(sector)}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 text-sm ${
                      selectedSector === sector ? "bg-blue-100 font-medium" : ""
                    }`}
                  >
                    {sector}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Particulars</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Purchase Price</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Quantity</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Investment</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Portfolio</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Exchange</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">CMP</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Present Value</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Gain/Loss</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">P/E Ratio</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Latest Earnings</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStocks.map((stock, index) => (
              <tr key={`${stock.particulars}-${index}`} className="hover:bg-gray-50">
                <td className="px-4 py-4 font-medium text-gray-900">{stock.particulars}</td>
                <td className="px-4 py-4 text-right text-gray-900">₹{formatNumber(stock.purchasePrice)}</td>
                <td className="px-4 py-4 text-right text-gray-900">{formatNumber(stock.quantity)}</td>
                <td className="px-4 py-4 text-right text-gray-900">{formatCurrency(stock.investment)}</td>
                <td className="px-4 py-4 text-right text-gray-900">{stock.portfolioPercent || 0}%</td>
                <td className="px-4 py-4 text-center text-gray-600">{stock.nse || stock.bse || "N/A"}</td>
                <td className="px-4 py-4 text-right font-medium text-gray-900">₹{formatNumber(stock.cmp)}</td>
                <td className="px-4 py-4 text-right text-gray-900">{formatCurrency(stock.presentValue)}</td>
                <td className={`px-4 py-4 text-right font-medium ${stock.gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                  <div className="flex items-center justify-end gap-1">
                    {stock.gainLoss >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {formatCurrency(stock.gainLoss)}
                    <span className="text-xs ml-1">({stock.gainLossPercent}%)</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-gray-600">{stock.peRatio ? Number(stock.peRatio).toFixed(2) : "N/A"}</td>
                <td className="px-4 py-4 text-right text-gray-600">{stock.latestEarnings || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioTable;