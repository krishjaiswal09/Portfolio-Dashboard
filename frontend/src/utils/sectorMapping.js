// Which stocks belong to which sectors
export const SECTOR_MAPPING = {
  'Financial Sector': ['HDFC', 'BAJAJ', 'ICICI', 'SAVANI', 'SBI LIFE'],
  'Tech Sector': ['AFFLE', 'LTI', 'KPIT', 'TATA TECH', 'BLS', 'TANLA', 'INFY', 'HAPPEIST', 'EASEMYTRIP'],
  'Consumer': ['DMART', 'TATA CONSUMER', 'PIDILITE'],
  'Power': ['TATA POWER', 'KPI GREEN', 'SUZLON', 'GENSOL'],
  'Pipe Sector': ['HARIOM', 'ASTRAL', 'POLYCAB'],
  'Chemical': ['CLEAN SCIENCE', 'DEEPAK NITRITE', 'FINE ORGANIC', 'GRAVITA'],
};

// Figure out which sector a stock belongs to
export const assignSector = (stockName) => {
  if (!stockName) return 'Others';
  
  const upperStockName = stockName.toUpperCase();
  
  // Look through each sector to find a match
  for (const [sector, stocks] of Object.entries(SECTOR_MAPPING)) {
    if (stocks.some(stock => upperStockName.includes(stock.toUpperCase()))) {
      return sector;
    }
  }
  
  return 'Others';
};