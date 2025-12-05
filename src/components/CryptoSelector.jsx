const coins = ["BTC", "ETH", "SOL", "XRP", "USDT", "ADA", "BNB", "DOT"];

export default function CryptoSelector({ value, onChange }) {
  return (
    <div>
      <select
        className="w-full h-10 px-3 rounded-lg bg-gray-900 text-primary border border-transparent hover:border-white/6 transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select cryptocurrency"
      >
        {coins.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
