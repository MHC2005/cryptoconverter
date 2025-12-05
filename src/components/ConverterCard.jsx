import { useState } from "react";
import CryptoSelector from "./CryptoSelector";

export default function ConverterCard({ prices }) {
  const [crypto, setCrypto] = useState("BTC");
  const [amount, setAmount] = useState(1);

  const usd = prices[crypto]?.usd ?? 0;
  const eur = prices[crypto]?.eur ?? 0;

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-4">
        Live Crypto Converter
      </h2>

      <CryptoSelector value={crypto} onChange={setCrypto} />

      <input
        type="number"
        className="w-full mt-4 p-3 bg-gray-800 text-white rounded-lg"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="mt-6 bg-gray-800 p-4 rounded-lg text-white space-y-2">
        <p>
          USD:{" "}
          <span className="font-bold">${(amount * usd).toFixed(2)}</span>
        </p>
        <p>
          EUR:{" "}
          <span className="font-bold">€{(amount * eur).toFixed(2)}</span>
        </p>
      </div>

      <p className="text-gray-400 text-sm mt-2">
        Prices update every 15 seconds
      </p>
    </div>
  );
}
