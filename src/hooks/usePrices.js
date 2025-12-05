import { useState, useEffect } from "react";

const API =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,tether,cardano,binancecoin,polkadot&vs_currencies=usd,eur";

export function usePrices() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  async function fetchPrices() {
    try {
      const res = await fetch(API);
      const data = await res.json();

      setPrices({
        BTC: data.bitcoin,
        ETH: data.ethereum,
        SOL: data.solana,
        XRP: data.ripple,
        USDT: data.tether,
        ADA: data.cardano,
        BNB: data.binancecoin,
        DOT: data.polkadot,
      });

      setLoading(false);
    } catch (err) {
      console.error("Error obteniendo precios:", err);
    }
  }

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, 15000); // refresca cada 15 seg

    return () => clearInterval(interval);
  }, []);

  return { prices, loading };
}
