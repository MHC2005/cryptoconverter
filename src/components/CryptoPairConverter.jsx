import { useState } from "react";
import CryptoSelector from "./CryptoSelector";

const coins = [
  { code: "BTC", name: "Bitcoin" },
  { code: "ETH", name: "Ethereum" },
  { code: "SOL", name: "Solana" },
  { code: "XRP", name: "XRP" },
  { code: "USDT", name: "Tether" },
  { code: "ADA", name: "Cardano" },
  { code: "BNB", name: "Binance" },
  { code: "DOT", name: "Polkadot" },
];

function fmt(value, currency = "USD") {
  if (value == null || Number.isNaN(value)) return "—";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch (e) {
    return value.toFixed(2);
  }
}

export default function CryptoPairConverter({ prices = {} }) {
  const [from, setFrom] = useState("BTC");
  const [to, setTo] = useState("DOT");
  const [animating, setAnimating] = useState(false);
  // store amount as string so user can clear entire field; parseFloat when needed
  const [amountStr, setAmountStr] = useState("");

  const amount = amountStr === '' ? null : parseFloat(amountStr);

  const fromPrice = prices[from]?.usd ?? null;
  const fromEur = prices[from]?.eur ?? null;
  const toPrice = prices[to]?.usd ?? null;
  const toEur = prices[to]?.eur ?? null;

  const toAmount = amount != null && fromPrice && toPrice ? (amount * fromPrice) / toPrice : null;

  function formatCryptoDisplay(val) {
    if (val == null || Number.isNaN(val)) return '—';
    if (Math.abs(val) >= 1000) {
      return val.toLocaleString(undefined, { maximumFractionDigits: 3 });
    }
    if (val >= 1) return val.toLocaleString(undefined, { maximumFractionDigits: 6 });
    // small numbers: show up to 6-8 decimals but trim
    return Number(val).toPrecision(6).replace(/(?:\.0+|0+)$/, '');
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-surface p-6 rounded-2xl border border-transparent hover:border-white/6 transition overflow-visible">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-center converter-amount-row">
            <input
              type="text"
              inputMode="decimal"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="Amount"
              className="w-72 h-12 px-4 bg-gray-900 text-primary rounded-xl no-spinner outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted"
            />
          </div>

          <div className="flex items-center gap-6 justify-center converter-selects">
            <div className="w-72">
              <CryptoSelector value={from} onChange={setFrom} />
            </div>

            <button
              className="w-12 h-10 rounded-md bg-primary/90 flex items-center justify-center text-white shadow-md"
              onClick={() => {
                // animate swap
                setAnimating(true);
                const prev = from;
                setFrom(to);
                setTo(prev);
                setTimeout(() => setAnimating(false), 350);
              }}
              aria-label="swap"
            >
              <span className={`swap-rotate ${animating ? 'animating' : ''}`}>⇄</span>
            </button>

            <div className="w-72">
              <CryptoSelector value={to} onChange={setTo} />
            </div>
          </div>

          <div className="mt-2 text-center">
            {/* when empty show 'FROM - TO', when present show the conversion */}
            {amountStr === '' ? (
              <div className="text-primary font-semibold">{from} - {to}</div>
            ) : (
              <div className="text-primary font-semibold">{amountStr} {from} = {formatCryptoDisplay(toAmount)} {to}</div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="font-semibold">{fmt(fromPrice && amount != null ? amount * fromPrice : null, 'USD')}</div>
              </div>

              <div>
                <div className="font-semibold">{fmt(toEur && toAmount != null ? toAmount * toEur : null, 'EUR')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
