import { usePrices } from "./hooks/usePrices";
import ConverterCard from "./components/ConverterCard";
import CryptoPairConverter from "./components/CryptoPairConverter";
import Header from "./components/Header";
import MarketTicker from "./components/MarketTicker";

function App() {
  const { prices, loading, lastUpdated } = usePrices();

  return (
  <div className="min-h-screen bg-darkbg text-primary font-sans">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <section className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 shadow-2xl fade-in-up">
              {loading ? (
                <p className="text-primary text-lg animate-pulse">Loading crypto prices...</p>
              ) : (
                <CryptoPairConverter prices={prices} />
              )}
            </div>
          </section>

          <section className="lg:col-span-2">
            <div className="glass rounded-2xl p-4 shadow-lg fade-in-up flex flex-col">
              <div className="flex-grow">
                <MarketTicker prices={prices} loading={loading} lastUpdated={lastUpdated} />
              </div>

              <div className="mt-8 pt-4">
                <a href="https://github.com/mhc2005/cryptoconverter" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CryptoConverter - github.com/mhc2005/cryptoconverter</a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
