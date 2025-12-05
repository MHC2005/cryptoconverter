import React from "react";

export default function MarketTicker({ prices = {}, loading }) {
  const coins = ["BTC", "ETH", "SOL", "XRP", "USDT", "ADA", "BNB", "DOT"];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/4">
        <h3 className="text-lg font-semibold">Markets</h3>
        <div className="text-sm text-muted">Real-time prices · updated every 15s</div>
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
              const change = p.usd_24h_change ? `${p.usd_24h_change.toFixed(2)}%` : "—";

              return (
                <tr key={c} className="border-b border-white/2">
                  <td className="px-3 py-3 font-medium">{c}</td>
                  <td className="px-3 py-3">{usd}</td>
                  <td className="px-3 py-3">{eur}</td>
                  <td className={`px-3 py-3 ${p.usd_24h_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
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
