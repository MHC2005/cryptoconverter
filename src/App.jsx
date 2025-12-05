import { usePrices } from "./hooks/usePrices";
import ConverterCard from "./components/ConverterCard";

function App() {
  const { prices, loading } = usePrices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center p-6">
      {loading ? (
        <p className="text-white text-xl animate-pulse">
          Loading crypto prices...
        </p>
      ) : (
        <ConverterCard prices={prices} />
      )}
    </div>
  );
}

export default App;
