import { useState } from "react";

const formatShortPrice = (price) => {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(2)}M`;
  if (price >= 1000) return `$${(price / 1000).toFixed(2)}K`;
  return `$${price.toFixed(2)}`;
};

const formatFullPrice = (price) => {
  return `$${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

function HoldingsTable({ holdings, selectedCoins, onToggle, onSelectAll }) {
  const [showAllRows, setShowAllRows] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const visibleRowCount = 5;
  const [sortConfig, setSortConfig] = useState({
    key: "stcg",
    direction: "desc",
  });

  const isSelected = (item) =>
    selectedCoins.find(
      (c) => c.coin === item.coin && c.coinName === item.coinName,
    );

  const handleSort = () => {
    setSortConfig((prev) => ({
      key: "stcg",
      direction: prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    const aVal = a.stcg?.gain ?? 0;
    const bVal = b.stcg?.gain ?? 0;
    return sortConfig.direction === "desc" ? bVal - aVal : aVal - bVal;
  });

  const visibleHoldings = showAllRows
    ? sortedHoldings
    : sortedHoldings.slice(0, visibleRowCount);
  const hasMoreRows = sortedHoldings.length > visibleRowCount;

  const areAllSelected =
    holdings.length > 0 && holdings.every((item) => !!isSelected(item));
  const rowCellClass = "py-6 px-4 border-b border-[#2b3558]";

  return (
    <div className="bg-[#1a2035] rounded-xl p-8">
      <h2 className="text-lg font-bold mb-6">Holdings</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-0">
          {/* Header */}
          <thead>
            <tr className="text-gray-400 bg-[#0d1117]">
              <th className="py-4 px-4 text-left rounded-tl-lg rounded-bl-lg w-10">
                <input
                  type="checkbox"
                  checked={areAllSelected}
                  onChange={onSelectAll}
                  className="w-4 h-4 accent-blue-500 cursor-pointer"
                />
              </th>

              <th className="py-4 px-4 text-left whitespace-nowrap">Asset</th>

              <th className="py-4 px-4 text-right whitespace-nowrap">
                <div>Holdings</div>
                <div className="text-xs text-gray-500">Avg Buy Price</div>
              </th>

              <th className="py-4 px-4 text-right whitespace-nowrap">
                Current Price
              </th>

              <th
                className="py-4 px-4 text-right cursor-pointer select-none whitespace-nowrap"
                onClick={handleSort}
              >
                <div className="flex items-center justify-end gap-1">
                  <span className="text-xs">
                    {sortConfig.direction === "desc" ? "▼" : "▲"}
                  </span>
                  <span>Short-Term</span>
                </div>
              </th>

              <th className="py-4 px-4 text-right whitespace-nowrap">
                Long-Term
              </th>

              <th className="py-4 px-4 text-right rounded-tr-lg rounded-br-lg whitespace-nowrap">
                Amount to Sell
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {visibleHoldings.map((item, index) => {
              const selected = isSelected(item);
              const stcgGain = item.stcg?.gain ?? 0;
              const ltcgGain = item.ltcg?.gain ?? 0;
              const stcgBalance = item.stcg?.balance ?? 0;
              const ltcgBalance = item.ltcg?.balance ?? 0;
              const totalHolding = item.totalHolding ?? 0;
              const currentPrice = item.currentPrice ?? 0;

              return (
                <tr
                  key={index}
                  onClick={() => onToggle(item)}
                  className={`cursor-pointer transition-all duration-150 hover:bg-[#1e3a5f]/40 ${
                    selected
                      ? "bg-[#102447] shadow-[inset_0_1px_0_rgba(81,112,168,0.7),inset_0_-1px_0_rgba(81,112,168,0.7)]"
                      : ""
                  }`}
                >
                  {/* Checkbox */}
                  <td className={rowCellClass}>
                    <input
                      type="checkbox"
                      checked={!!selected}
                      onChange={() => onToggle(item)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 accent-blue-500 cursor-pointer"
                    />
                  </td>

                  {/* Asset */}
                  <td className={rowCellClass}>
                    <div className="flex items-center gap-4">
                      <img
                        src={item.logo}
                        alt={item.coin}
                        width={36}
                        height={36}
                        className="rounded-full flex-shrink-0"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/36")
                        }
                      />
                      <div>
                        <div className="font-semibold text-white">
                          {item.coinName}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {item.coin}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Holdings + Avg Buy Price */}
                  <td className={`${rowCellClass} text-right`}>
                    <div className="font-medium">
                      {totalHolding.toFixed(4)} {item.coin}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      ${currentPrice.toLocaleString()}/{item.coin}
                    </div>
                  </td>

                  {/* Current Price with tooltip */}
                  <td className={`${rowCellClass} text-right`}>
                    <div
                      className="relative inline-block"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <span className="cursor-pointer font-medium">
                        {formatShortPrice(currentPrice)}
                      </span>

                      {hoveredIndex === index && (
                        <div
                          className="absolute bottom-8 left-1/2 -translate-x-1/2
                                     bg-white text-black text-xs rounded-lg px-3 py-2
                                     shadow-xl whitespace-nowrap"
                          style={{ zIndex: 9999 }}
                        >
                          {formatFullPrice(currentPrice)}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Short Term */}
                  <td className={`${rowCellClass} text-right`}>
                    <div
                      className={`font-semibold ${stcgGain >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {stcgGain >= 0 ? "+" : "-"}$
                      {Math.abs(stcgGain).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {stcgBalance.toFixed(4)} {item.coin}
                    </div>
                  </td>

                  {/* Long Term */}
                  <td className={`${rowCellClass} text-right`}>
                    <div
                      className={`font-semibold ${ltcgGain >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {ltcgGain >= 0 ? "+" : "-"}$
                      {Math.abs(ltcgGain).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {ltcgBalance.toFixed(4)} {item.coin}
                    </div>
                  </td>

                  {/* Amount to Sell */}
                  <td
                    className={`${rowCellClass} text-right text-gray-400 whitespace-nowrap`}
                  >
                    {selected ? `${totalHolding.toFixed(4)} ${item.coin}` : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hasMoreRows && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowAllRows((prev) => !prev)}
            className="text-blue-400 text-sm underline"
          >
            {showAllRows ? "Show less" : "View all"}
          </button>
        </div>
      )}
    </div>
  );
}

export default HoldingsTable;
