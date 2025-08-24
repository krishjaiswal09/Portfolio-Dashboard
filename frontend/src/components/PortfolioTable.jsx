import { useEffect, useState } from "react";
import axios from "axios";

export default function PortfolioTable() {
  const [stocks, setStocks] = useState([
    { symbol: "HDFCBANK.NS" },
    { symbol: "TCS.NS" },
    { symbol: "RELIANCE.NS" }
  ]);

  useEffect(() => {
    const fetchCMP = async () => {
      const updated = await Promise.all(
        stocks.map(async (s) => {
          const res = await axios.get(`http://localhost:5000/api/cmp/${s.symbol}`);
          return { ...s, cmp: res.data.cmp, currency: res.data.currency };
        })
      );
      setStocks(updated);
    };

    fetchCMP();
    const interval = setInterval(fetchCMP, 3000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Portfolio CMP Table</h1>
      <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Symbol</th>
            <th className="border px-4 py-2">CMP</th>
            <th className="border px-4 py-2">Currency</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr key={s.symbol}>
              <td className="border px-4 py-2">{s.symbol}</td>
              <td className="border px-4 py-2">{s.cmp ?? "Loading..."}</td>
              <td className="border px-4 py-2">{s.currency ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
