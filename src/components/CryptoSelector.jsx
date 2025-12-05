const coins = ["BTC", "ETH", "SOL", "XRP", "USDT", "ADA", "BNB", "DOT"];

export default function CryptoSelector({ value, onChange }) {
  return (
    <select
      className="p-3 rounded-lg bg-gray-800 text-white w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {coins.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
