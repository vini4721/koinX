import { useEffect, useState } from "react";
import CapitalGainsCard from "./components/CapitalGainsCard";
import Disclaimer from "./components/Disclaimer";
import HoldingsTable from "./components/HoldingsTable";
import mockData from "./data/mockData.json";

function App() {
  const [capitalGains, setCapitalGains] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);

  useEffect(() => {
    setCapitalGains(mockData.capitalGains);
    setHoldings(mockData.holdings);
  }, []);

  const handleToggle = (item) => {
    setSelectedCoins((prev) => {
      const exists = prev.find(
        (c) => c.coin === item.coin && c.coinName === item.coinName,
      );
      if (exists)
        return prev.filter(
          (c) => !(c.coin === item.coin && c.coinName === item.coinName),
        );
      return [...prev, item];
    });
  };

  const handleSelectAll = () => {
    if (selectedCoins.length === holdings.length) {
      setSelectedCoins([]);
    } else {
      setSelectedCoins([...holdings]);
    }
  };

  if (!capitalGains) return <p className="text-white">Loading...</p>;

  // Calculate post harvesting gains
  const postGains = {
    stcg: {
      profits: capitalGains.stcg.profits,
      losses:
        capitalGains.stcg.losses +
        selectedCoins.reduce(
          (sum, c) => sum + Math.max(0, -(c.stcg?.gain ?? 0)),
          0,
        ),
    },
    ltcg: {
      profits: capitalGains.ltcg.profits,
      losses:
        capitalGains.ltcg.losses +
        selectedCoins.reduce(
          (sum, c) => sum + Math.max(0, -(c.ltcg?.gain ?? 0)),
          0,
        ),
    },
  };

  // Savings = difference between pre and post total
  const preTotal =
    capitalGains.stcg.profits -
    capitalGains.stcg.losses +
    capitalGains.ltcg.profits -
    capitalGains.ltcg.losses;

  const postTotal =
    postGains.stcg.profits -
    postGains.stcg.losses +
    postGains.ltcg.profits -
    postGains.ltcg.losses;

  const savings = Math.max(0, preTotal - postTotal);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Navbar */}
      {/* Navbar */}
      <div className="bg-[#1a2035] px-8 py-4 flex items-center">
        <span className="font-bold text-2xl" style={{ color: "#3b82f6" }}>
          Koin
        </span>
        <span
          className="font-bold text-2xl"
          style={{
            background: "linear-gradient(135deg, #f97316, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          X
        </span>
        <span className="text-gray-400 text-xs align-super ml-0.5">®</span>
      </div>

      {/* Main Content */}
      <div className="w-full px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-6 relative">
          <h1 className="text-2xl font-bold">Tax Harvesting</h1>

          {/* How it works with tooltip */}
          <div className="relative group">
            <a href="#" className="text-blue-400 text-sm underline">
              How it works?
            </a>

            {/* Tooltip — shows on hover */}
            <div
              className="absolute left-0 top-8 w-72 bg-white text-black text-sm rounded-xl p-4 shadow-xl z-50
                    invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              {/* Triangle arrow at top */}
              <div className="absolute -top-2 left-4 w-4 h-4 bg-white rotate-45 rounded-sm"></div>

              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh
                semper mattis scelerisque tellus. Vel mattis diam duis morbi
                tellus dui consectetur.{" "}
                <a href="#" className="text-blue-500 underline">
                  Know More
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <Disclaimer />

        {/* Two Cards */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <CapitalGainsCard
            title="Pre Harvesting"
            gains={capitalGains}
            isBlue={false}
          />
          <CapitalGainsCard
            title="After Harvesting"
            gains={postGains}
            isBlue={true}
            savings={savings}
            selectedCoinCount={selectedCoins.length}
          />
        </div>

        {/* Holdings Table */}
        <HoldingsTable
          holdings={holdings}
          selectedCoins={selectedCoins}
          onToggle={handleToggle}
          onSelectAll={handleSelectAll}
        />
      </div>
    </div>
  );
}

export default App;
