import React from "react";
import { formatCurrency } from "../../utils/formatters.js";

const SectorSummary = ({ sectorSummaries }) => {
  if (!sectorSummaries || !Object.keys(sectorSummaries).length) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="px-6 py-4 border-b bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900">Sector Summary</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Sector", "Investment", "Present Value", "Gain/Loss", "Stocks"].map((header, i) => (
                <th key={header} className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase ${
                  i === 0 ? "text-left" : i === 4 ? "text-center" : "text-right"
                }`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.entries(sectorSummaries).map(([sector, data]) => (
              <tr key={sector} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{sector}</td>
                <td className="px-6 py-4 text-right text-gray-900">{formatCurrency(data.investment)}</td>
                <td className="px-6 py-4 text-right text-gray-900">{formatCurrency(data.presentValue)}</td>
                <td className={`px-6 py-4 text-right font-medium ${data.gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(data.gainLoss)}
                </td>
                <td className="px-6 py-4 text-center text-gray-500">{data.stocks.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectorSummary;