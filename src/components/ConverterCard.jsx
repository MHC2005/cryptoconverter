import { useState } from "react";
import CryptoSelector from "./CryptoSelector";

export default function ConverterCard({ prices }) {
  const [crypto, setCrypto] = useState("BTC");
  const [amount, setAmount] = useState(1);

  const usd = prices[crypto]?.usd ?? 0;
  const eur = prices[crypto]?.eur ?? 0;

  return (
    <div className="w-full max-w-md">
  <h2 className="text-xl font-semibold text-primary mb-4">Live Crypto Converter</h2>

      <div className="bg-surface p-4 rounded-xl border border-transparent hover:border-white/6 transition">
        <CryptoSelector value={crypto} onChange={setCrypto} />

        <div className="mt-4 flex gap-3">
          <input
            type="number"
            className="flex-1 p-3 bg-gray-900 text-primary rounded-lg outline-none focus:ring-2 focus:ring-primary/40"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-label="amount"
          />

          <button
            className="px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 transition text-white font-medium"
            onClick={() => setAmount(1)}
            aria-label="reset"
          >
            Reset
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 bg-gray-900 p-3 rounded-md">
          <div>
            <p className="text-sm text-muted">USD</p>
            <p className="text-lg font-semibold">${(amount * usd).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted">EUR</p>
            <p className="text-lg font-semibold">€{(amount * eur).toFixed(2)}</p>
          </div>
        </div>

        <p className="text-sm text-muted mt-3">Prices update every 15 seconds</p>
      </div>
    </div>
  );
}
