# Portfolio Dashboard

A dynamic portfolio dashboard built with React, TypeScript, Tailwind CSS, and Node.js, designed to track stocks in real-time using custom APIs.

## Project Overview

This dashboard fetches CMP, P/E ratios, and latest earnings using APIs built from Yahoo Finance and Google Finance data sources. The backend is hosted on Render for reliable access: `https://portfolio-dashboard-6o9w.onrender.com/api/portfolio`. It provides interactive tables, summaries, and sector-level analysis for better portfolio management.

### Key Features

* Real-time portfolio updates every 15 seconds
* Portfolio summary: Total Investment, Present Value, Gain/Loss
* Sector-wise summaries with gain/loss indicators
* Interactive holdings table with filters by sector
* Visual indicators for gains (green) and losses (red)
* Modern, responsive UI built with Tailwind CSS and Shadcn-UI
* Fetching and processing data directly from real Excel files using `read-excel-file/node`

### Tech Stack

* **Frontend:** React, TypeScript, Vite, Shadcn-UI
* **Backend:** Node.js, Express (hosted on Render)
* **Styling:** Tailwind CSS
* **APIs:** Custom APIs using Yahoo Finance and Google Finance

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio-dashboard.git
cd portfolio-dashboard

# Backend setup
cd backend
npm install
npm start

# Frontend setup
cd ../frontend
npm install
npm run dev
```

### Usage

* Open `http://localhost:5173` in your browser
* Refresh the portfolio using the dashboard button to fetch the latest stock data from the hosted API
* Filter stocks by sector to see detailed sector-level summaries

### Key Challenges Faced

* Fetching and processing portfolio data directly from an Excel sheet
* Creating a custom backend API to handle and serve this data
* Retrieving current market price (CMP), P/E ratio, and latest earnings from Yahoo Finance and Google Finance, which required handling unofficial APIs and scraping methods
* Developing custom hooks and utility functions for state management and calculations, which was extremely challenging

### Data Flow

```mermaid
flowchart TD
    API[API Endpoint<br/>portfolio-dashboard-6o9w.onrender.com/api/portfolio] --> Hook[usePortfolioData Hook]
    Hook --> RawData[Raw Portfolio Data<br/>Array of stocks with basic fields]
    RawData --> Enhance[enhancePortfolioData<br/>Calculate investment, present value, gain/loss]
    Enhance --> Enhanced[Enhanced Portfolio Data<br/>+ investment, presentValue, gainLoss, sector]
    Enhanced --> Stats[calculatePortfolioStats<br/>Totals & portfolio %]
    Enhanced --> SectorCalc[calculateSectorSummaries<br/>Group by sector & totals]

    Stats --> PortfolioSummary[PortfolioSummary Component<br/>3 summary cards]
    SectorCalc --> SectorSummary[SectorSummary Component<br/>Sector breakdown table]
    Enhanced --> PortfolioTable[PortfolioTable Component<br/>Detailed stock table with sector filter]
    Hook --> App[App Component<br/>Main orchestrator]
    App -->|loading| Loading[Loading Screen]
    App -->|error| Error[Error Screen with retry]
    App -->|portfolioStats| PortfolioSummary
    App -->|sectorSummaries| SectorSummary
    App -->|portfolioData + portfolioStats| PortfolioTable
    App -->|lastUpdated + refreshing + onRefresh| Header[DashboardHeader<br/>Title & refresh button]

    PortfolioSummary --> Dashboard[Dashboard UI<br/>Gradient background layout]
    SectorSummary --> Dashboard
    PortfolioTable --> Dashboard
    Header --> Dashboard

    Hook -.->|Auto-refresh every 15s| API
    Hook -.->|Manual refresh via header| API
    Error -.->|Try again| API

    style API fill:#e1f5fe
    style Dashboard fill:#f3e5f5
    style Hook fill:#fff3e0
    style App fill:#ffecb3
    style Enhance fill:#e8f5e8
    style Stats fill:#e8f5e8
    style SectorCalc fill:#e8f5e8
    style Loading fill:#ffcdd2
    style Error fill:#ffcdd2
```
