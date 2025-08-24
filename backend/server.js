import express from "express";
import yahooFinance from "yahoo-finance2";
import cors from "cors";
import readXlsxFile from "read-excel-file/node";
import path from "path";

const app = express();
app.use(cors());

// Excel file path
const filePath = path.join(process.cwd(), "data/Sample_Portfolio.xlsx");

// NSE code to Yahoo Finance symbol mapping
const stockSymbols = {
  532174: "ICICIBANK",
  544252: "BAJAJHFL",
  511577: "SAVANI",
  542651: "KPIT",
  544028: "TATATECH",
  544107: "BLS",
  532790: "TANLA",
  532540: "TATACONSUMER",
  500331: "PIDILITIND",
  500400: "TATAPOWER",
  542323: "KPIGREEN",
  532667: "SUZLON",
  542851: "GENSOL",
  543517: "HARIOMPIPE",
  542652: "POLYCAB",
  543318: "CLEAN",
  506401: "DEEPAKNTR",
  541557: "FINEORG",
  533282: "GRAVITA",
  540719: "SBILIFE",
  500209: "INFY",
  543237: "HAPPSTMNDS",
  543272: "EASEMYTRIP"
};

// Convert NSE codes to Yahoo symbols
function getStockSymbol(nseCode) {
  if (!nseCode) return null;
  
  if (typeof nseCode === 'string') {
    return nseCode;
  }
  
  if (typeof nseCode === 'number') {
    return stockSymbols[nseCode] || null;
  }
  
  return null;
}

// Fetch live stock data from Yahoo Finance
async function getLiveStockData(nseCode) {
  try {
    const symbol = getStockSymbol(nseCode);
    if (!symbol) {
      return { cmp: null, peRatio: null, latestEarning: null };
    }
    
    // Add .NS suffix for Indian stocks
    const yahooSymbol = symbol + ".NS";
    
    const data = await yahooFinance.quoteSummary(yahooSymbol, { 
      modules: ["price", "summaryDetail", "defaultKeyStatistics"] 
    });

    return {
      cmp: data.price.regularMarketPrice,
      peRatio: data.summaryDetail?.trailingPE || data.defaultKeyStatistics?.trailingPE,
      latestEarning: data.defaultKeyStatistics?.trailingEps,
    };
  } catch (error) {
    console.log(`Error fetching ${nseCode}: ${error.message}`);
    return { cmp: null, peRatio: null, latestEarning: null };
  }
}

// Main portfolio endpoint
app.get("/api/portfolio", async (req, res) => {
  try {
    console.log("Reading Excel file...");
    const rows = await readXlsxFile(filePath);
    const dataRows = rows.slice(2); // Skip header rows

    console.log("Processing portfolio data...");
    const portfolioData = dataRows.map((row) => ({
      particulars: row[1],
      purchasePrice: row[2],
      quantity: row[3],
      investment: row[4],
      portfolioPercent: row[5],
      nse: row[6],
      cmp: null,
      presentValue: null,
      gainLoss: null,
      peRatio: null,
      latestEarnings: null,
    }));

    console.log("Fetching live data...");
    const updatedPortfolio = [];
    
    for (const stock of portfolioData) {
      // Skip sector headers
      if (!stock.nse || !stock.particulars || stock.particulars.includes('Sector')) {
        updatedPortfolio.push(stock);
        continue;
      }
      
      const liveData = await getLiveStockData(stock.nse);
      
      stock.cmp = liveData.cmp;
      stock.peRatio = liveData.peRatio;
      stock.latestEarnings = liveData.latestEarning;
      
      // Calculate P&L
      if (stock.cmp && stock.quantity) {
        // Calculate PV
        stock.presentValue = stock.cmp * stock.quantity;
        // Calculate Gain/Loss
        stock.gainLoss = stock.presentValue - stock.investment;
      }
      
      updatedPortfolio.push(stock);
    }

    res.json({
      success: true,
      data: updatedPortfolio,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Portfolio API error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// // Single stock endpoint for testing
// app.get("/api/stock/:symbol", async (req, res) => {
//   try {
//     const symbol = req.params.symbol.toUpperCase() + ".NS";
    
//     const data = await yahooFinance.quoteSummary(symbol, { 
//       modules: ["price", "summaryDetail", "defaultKeyStatistics"] 
//     });

//     res.json({
//       symbol,
//       cmp: data.price.regularMarketPrice,
//       peRatio: data.summaryDetail?.trailingPE || data.defaultKeyStatistics?.trailingPE,
//       latestEarning: data.defaultKeyStatistics?.trailingEps,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("Portfolio API: http://localhost:5000/api/portfolio");
  // console.log("Stock API: http://localhost:5000/api/stock/RELIANCE");
});