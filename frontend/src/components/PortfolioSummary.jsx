import React from "react";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

const SummaryCard = ({ title, value, icon: Icon, isProfit = null }) => {
  const textColor =
    isProfit === null
      ? "text-gray-900"
      : isProfit
      ? "text-green-600"
      : "text-red-600";

  const iconColor =
    isProfit === null
      ? title.includes("Investment")
        ? "text-blue-600"
        : "text-green-600"
      : isProfit
      ? "text-green-600"
      : "text-red-600";

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
    </div>
  );
};

const PortfolioSummary = ({ portfolioStats }) => {
  if (!portfolioStats.totalInvestment) return null;

  const isProfit = portfolioStats.totalGainLoss >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Investment"
        value={formatCurrency(portfolioStats.totalInvestment)}
        icon={DollarSign}
      />
      <SummaryCard
        title="Present Value"
        value={formatCurrency(portfolioStats.totalPresentValue)}
        icon={BarChart3}
      />
      <SummaryCard
        title="Total Gain/Loss"
        value={formatCurrency(portfolioStats.totalGainLoss)}
        icon={isProfit ? TrendingUp : TrendingDown}
        isProfit={isProfit}
      />
    </div>
  );
};

export default PortfolioSummary;
