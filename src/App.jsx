import { useEffect, useState } from "react";
import CapitalGainsCard from "./components/CapitalGainsCard";
import Disclaimer from "./components/Disclaimer";
import HoldingsTable from "./components/HoldingsTable";
import mockData from "./data/mockData.json";

function App() {
  const [capitalGains, setCapitalGains] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [theme, setTheme] = useState("dark");

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

  if (!capitalGains)
    return (
      <p className={theme === "light" ? "text-[#1f2937]" : "text-white"}>
        Loading...
      </p>
    );

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
  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen w-full max-w-full overflow-x-hidden ${
        isLight ? "bg-[#dbe1e8] text-[#1f2937]" : "bg-[#0d1117] text-white"
      }`}
    >
      <div
        className={`px-4 md:px-8 py-4 flex w-full items-center justify-between ${
          isLight ? "bg-[#f4f6f8]" : "bg-[#1a2035]"
        }`}
      >
        <div className="inline-flex items-end gap-0.5 whitespace-nowrap leading-none">
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
          <span className="text-gray-400 text-xs -translate-y-2">®</span>
        </div>

        <button
          type="button"
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          className={`text-xs md:text-sm px-3 py-1.5 rounded-lg border transition-colors ${
            isLight
              ? "border-[#c9d1db] bg-white text-[#1f2937]"
              : "border-[#334155] bg-[#0d1117] text-gray-200"
          }`}
        >
          {isLight ? "Dark" : "Light"} mode
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-full px-4 md:px-8 py-6 md:py-8 overflow-x-hidden">
        {/* Page Header */}
        <div className="flex flex-col items-start gap-1 mb-4 md:mb-6 md:flex-row md:items-center md:gap-4 relative min-w-0">
          <h1 className="text-xl md:text-2xl font-bold leading-tight">
            Tax Harvesting
          </h1>

          {/* How it works with tooltip */}
          <div className="relative group">
            <a href="#" className="text-blue-500 text-sm underline">
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
        <Disclaimer theme={theme} />

        {/* Two Cards */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <CapitalGainsCard
            title="Pre Harvesting"
            gains={capitalGains}
            isBlue={false}
            theme={theme}
          />
          <CapitalGainsCard
            title="After Harvesting"
            gains={postGains}
            isBlue={true}
            savings={savings}
            selectedCoinCount={selectedCoins.length}
            theme={theme}
          />
        </div>

        {/* Holdings Table */}
        <HoldingsTable
          holdings={holdings}
          selectedCoins={selectedCoins}
          onToggle={handleToggle}
          onSelectAll={handleSelectAll}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default App;
