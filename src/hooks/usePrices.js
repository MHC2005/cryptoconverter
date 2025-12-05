import { useState, useEffect, useRef } from "react";

// CoinGecko REST endpoint for baseline data (EUR and 24h change)
const COINGECKO_API =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,tether,cardano,binancecoin,polkadot&vs_currencies=usd,eur&include_24hr_change=true";

// CoinCap websocket for real-time USD updates
// assets list: bitcoin,ethereum,solana,ripple,tether,cardano,binance-coin,polkadot
const COINCAP_WS =
  "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana,ripple,tether,cardano,binance-coin,polkadot";

const idToSymbol = {
  bitcoin: "BTC",
  ethereum: "ETH",
  solana: "SOL",
  ripple: "XRP",
  tether: "USDT",
  cardano: "ADA",
  "binance-coin": "BNB",
  polkadot: "DOT",
};

export function usePrices() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const wsRef = useRef(null);
  const reconnectRef = useRef(null);

  // fetch baseline data from CoinGecko (usd, eur, 24h change)
  async function fetchPrices() {
    try {
      const res = await fetch(COINGECKO_API);
      const data = await res.json();

      setPrices((prev) => ({
        BTC: { ...(prev.BTC || {}), ...data.bitcoin },
        ETH: { ...(prev.ETH || {}), ...data.ethereum },
        SOL: { ...(prev.SOL || {}), ...data.solana },
        XRP: { ...(prev.XRP || {}), ...data.ripple },
        USDT: { ...(prev.USDT || {}), ...data.tether },
        ADA: { ...(prev.ADA || {}), ...data.cardano },
        BNB: { ...(prev.BNB || {}), ...data.binancecoin },
        DOT: { ...(prev.DOT || {}), ...data.polkadot },
      }));

      setLoading(false);
      setLastUpdated(Date.now());
    } catch (err) {
      console.error("Error obteniendo precios:", err);
      // ensure UI doesn't stay stuck in loading state if the REST call fails
      setLoading(false);
    }
  }

  // open a CoinCap websocket to receive near-instant USD price updates
  function connectWebsocket() {
    if (wsRef.current) return;

    try {
      const ws = new WebSocket(COINCAP_WS);
      wsRef.current = ws;

      ws.onopen = () => {
        // console.log('CoinCap WS connected');
      };

      ws.onmessage = (evt) => {
        try {
          const msg = JSON.parse(evt.data);
          // msg is like { bitcoin: "12345.12", ethereum: "..." }
          setPrices((prev) => {
            const next = { ...prev };
            for (const key in msg) {
              const sym = idToSymbol[key];
              if (!sym) continue;
              const val = Number(msg[key]);
              // ensure we keep existing eur and 24h data if present
              const existing = next[sym] || {};
              next[sym] = { ...existing, usd: val };
            }
            setLastUpdated(Date.now());
            return next;
          });
        } catch (e) {
          console.warn("WS parse error", e);
        }
      };

      ws.onclose = () => {
        wsRef.current = null;
        // try to reconnect after a shorter delay
        reconnectRef.current = setTimeout(() => connectWebsocket(), 1500);
      };

      ws.onerror = (err) => {
        console.error("CoinCap WS error", err);
        ws.close();
      };
    } catch (err) {
      console.error("WS connect error", err);
    }
  }

  useEffect(() => {
    // initial fetch for EUR and 24h change and initial USD values
    fetchPrices();

  // periodic refresh to update EUR and 24h change (aggressive fallback polling every 5s)
  // keeps the page frequently up-to-date if WS is not delivering updates
  const interval = setInterval(fetchPrices, 5000);

    // start websocket for real-time USD updates
    connectWebsocket();

    return () => {
      clearInterval(interval);
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch (e) {}
        wsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { prices, loading, lastUpdated };
}
