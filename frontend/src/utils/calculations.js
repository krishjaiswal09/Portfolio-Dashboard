import { assignSector } from './sectorMapping.js';

// Add extra info to each stock (profit/loss, sector, etc.)
export const enhancePortfolioData = (data) => {
  return data.map(stock => {
    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = stock.cmp * stock.quantity;
    const gainLoss = presentValue - investment;
    const sector = assignSector(stock.particulars);
    
    return {
      ...stock,
      investment,
      presentValue,
      gainLoss,
      sector,
      gainLossPercent: ((gainLoss / investment) * 100).toFixed(2)
    };
  });
};

// Calculate total portfolio numbers
export const calculatePortfolioStats = (portfolioData) => {
  if (!portfolioData.length) return {};

  const totalInvestment = portfolioData.reduce((sum, stock) => sum + stock.investment, 0);
  const totalPresentValue = portfolioData.reduce((sum, stock) => sum + stock.presentValue, 0);
  const totalGainLoss = totalPresentValue - totalInvestment;
  const totalGainLossPercent = ((totalGainLoss / totalInvestment) * 100).toFixed(2);

  // Add percentage of total portfolio for each stock
  const dataWithPortfolioPercent = portfolioData.map(stock => ({
    ...stock,
    portfolioPercent: ((stock.investment / totalInvestment) * 100).toFixed(2)
  }));

  return {
    totalInvestment,
    totalPresentValue,
    totalGainLoss,
    totalGainLossPercent,
    dataWithPortfolioPercent
  };
};

// Group stocks by sector and calculate sector totals
export const calculateSectorSummaries = (portfolioData) => {
  if (!portfolioData.length) return {};

  const sectors = {};
  
  // Group all stocks by their sector
  portfolioData.forEach(stock => {
    if (!sectors[stock.sector]) {
      sectors[stock.sector] = {
        investment: 0,
        presentValue: 0,
        gainLoss: 0,
        stocks: []
      };
    }
    sectors[stock.sector].investment += stock.investment;
    sectors[stock.sector].presentValue += stock.presentValue;
    sectors[stock.sector].gainLoss += stock.gainLoss;
    sectors[stock.sector].stocks.push(stock);
  });

  // Calculate gain/loss percentage for each sector
  Object.keys(sectors).forEach(sector => {
    const sectorData = sectors[sector];
    sectorData.gainLossPercent = ((sectorData.gainLoss / sectorData.investment) * 100).toFixed(2);
  });

  return sectors;
};