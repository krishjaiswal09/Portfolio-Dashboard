import { assignSector } from './sectorMapping.js';

// Add useful fields to each stock (like profit/loss, sector, % returns)
export const enhancePortfolioData = (data) => {
  return data.map(stock => {
    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = stock.cmp * stock.quantity;
    const gainLoss = presentValue - investment;

    return {
      ...stock,
      investment,
      presentValue,
      gainLoss,
      sector: assignSector(stock.particulars),
      gainLossPercent: ((gainLoss / investment) * 100).toFixed(2),
    };
  });
};

// Get overall portfolio stats (totals + portfolio % for each stock)
export const calculatePortfolioStats = (portfolioData) => {
  if (!portfolioData.length) return {};

  const totalInvestment = portfolioData.reduce((sum, stock) => sum + stock.investment, 0);
  const totalPresentValue = portfolioData.reduce((sum, stock) => sum + stock.presentValue, 0);
  const totalGainLoss = totalPresentValue - totalInvestment;
  const totalGainLossPercent = ((totalGainLoss / totalInvestment) * 100).toFixed(2);

  return {
    totalInvestment,
    totalPresentValue,
    totalGainLoss,
    totalGainLossPercent,
    dataWithPortfolioPercent: portfolioData.map(stock => ({
      ...stock,
      portfolioPercent: ((stock.investment / totalInvestment) * 100).toFixed(2),
    })),
  };
};

// Break portfolio down by sector (totals + gain/loss per sector)
export const calculateSectorSummaries = (portfolioData) => {
  if (!portfolioData.length) return {};

  const sectors = {};

  portfolioData.forEach(stock => {
    if (!sectors[stock.sector]) {
      sectors[stock.sector] = {
        investment: 0,
        presentValue: 0,
        gainLoss: 0,
        stocks: [],
      };
    }
    sectors[stock.sector].investment += stock.investment;
    sectors[stock.sector].presentValue += stock.presentValue;
    sectors[stock.sector].gainLoss += stock.gainLoss;
    sectors[stock.sector].stocks.push(stock);
  });

  Object.values(sectors).forEach(sectorData => {
    sectorData.gainLossPercent = ((sectorData.gainLoss / sectorData.investment) * 100).toFixed(2);
  });

  return sectors;
};
