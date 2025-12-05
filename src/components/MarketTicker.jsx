import React from "react";

export default function MarketTicker({ prices = {}, loading, lastUpdated = null }) {
  const coins = ["BTC", "ETH", "SOL", "XRP", "USDT", "ADA", "BNB", "DOT"];

  const formatTime = (ts) => {
    if (!ts) return "";
    try {
      return new Date(ts).toLocaleTimeString();
    } catch (e) { return "" }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-lg font-semibold">Markets</h3>
        <div className="text-sm text-muted">Last update: {formatTime(lastUpdated)}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left mt-3">
          <thead>
            <tr className="text-muted text-sm">
              <th className="px-3 py-2">Coin</th>
              <th className="px-3 py-2">Price (USD)</th>
              <th className="px-3 py-2">Price (EUR)</th>
              <th className="px-3 py-2">24h</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-muted">Loading...</td>
              </tr>
            )}

            {!loading && coins.map((c) => {
              const p = prices[c] || {};
              const usd = p.usd ? `$${p.usd.toFixed(2)}` : "—";
              const eur = p.eur ? `€${p.eur.toFixed(2)}` : "—";
              // placeholder for 24h change, if available
              const changeVal = typeof p.usd_24h_change === 'number' ? p.usd_24h_change : null;
              const change = changeVal !== null ? `${changeVal.toFixed(2)}%` : "—";
              // color: positive green, neutral blue (0), negative red
              const changeClass = changeVal === null ? 'text-muted' : (changeVal > 0 ? 'change-positive' : (changeVal === 0 ? 'change-neutral' : 'change-negative'));

              return (
                <tr key={c}>
                  <td className="px-3 py-3 font-medium">{c}</td>
                  <td className="px-3 py-3">{usd}</td>
                  <td className="px-3 py-3">{eur}</td>
                  <td className={`px-3 py-3 ${changeClass}`}>
                    {change}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
