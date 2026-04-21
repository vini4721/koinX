function CapitalGainsCard({
  title,
  gains,
  isBlue,
  savings,
  selectedCoinCount = 0,
  theme = "dark",
}) {
  const stcgNet = gains.stcg.profits - gains.stcg.losses;
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses;
  const totalNet = stcgNet + ltcgNet;
  const isLight = theme === "light";

  const bg = isBlue
    ? "bg-blue-500 text-white"
    : isLight
      ? "bg-white text-[#1f2937]"
      : "bg-[#1a2035] text-white";
  const mutedText = isBlue
    ? "text-blue-100"
    : isLight
      ? "text-gray-500"
      : "text-gray-300";
  const borderColor = isBlue
    ? "border-white/10"
    : isLight
      ? "border-gray-200"
      : "border-white/10";

  return (
    <div className={`min-w-0 flex-1 rounded-xl p-4 md:p-6 ${bg}`}>
      <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4">{title}</h2>

      <div className={`flex gap-2 text-[11px] md:text-sm mb-1 ${mutedText}`}>
        <span className="min-w-0 flex-1"></span>
        <span className="min-w-0 flex-1 text-right">Short-term</span>
        <span className="min-w-0 flex-1 text-right">Long-term</span>
      </div>

      <div
        className={`flex gap-2 py-2.5 md:py-3 border-b text-[11px] md:text-sm ${borderColor}`}
      >
        <span className="min-w-0 flex-1">Profits</span>
        <span className="min-w-0 flex-1 text-right">
          $ {gains.stcg.profits.toFixed(2)}
        </span>
        <span className="min-w-0 flex-1 text-right">
          $ {gains.ltcg.profits.toFixed(2)}
        </span>
      </div>

      <div
        className={`flex gap-2 py-2.5 md:py-3 border-b text-[11px] md:text-sm ${borderColor}`}
      >
        <span className="min-w-0 flex-1">Losses</span>
        <span className="min-w-0 flex-1 text-right">
          - $ {gains.stcg.losses.toFixed(2)}
        </span>
        <span className="min-w-0 flex-1 text-right">
          - $ {gains.ltcg.losses.toFixed(2)}
        </span>
      </div>

      <div
        className={`flex gap-2 py-2.5 md:py-3 border-b text-[11px] md:text-sm font-semibold ${borderColor}`}
      >
        <span className="min-w-0 flex-1">Net Capital Gains</span>
        <span
          className={`min-w-0 flex-1 text-right ${stcgNet < 0 ? (isLight ? "text-red-500" : "text-red-300") : ""}`}
        >
          {stcgNet < 0
            ? `- $ ${Math.abs(stcgNet).toFixed(2)}`
            : `$ ${stcgNet.toFixed(2)}`}
        </span>
        <span
          className={`min-w-0 flex-1 text-right ${ltcgNet < 0 ? (isLight ? "text-red-500" : "text-red-300") : ""}`}
        >
          {ltcgNet < 0
            ? `- $ ${Math.abs(ltcgNet).toFixed(2)}`
            : `$ ${ltcgNet.toFixed(2)}`}
        </span>
      </div>

      <div className="flex items-center justify-between mt-3 md:mt-4 gap-2 min-w-0">
        <span className="min-w-0 font-bold text-xs md:text-sm leading-tight">
          {isBlue ? "Effective Capital Gains:" : "Realised Capital Gains:"}
        </span>
        <span
          className={`whitespace-nowrap text-base md:text-2xl font-bold ${totalNet < 0 ? (isLight ? "text-red-500" : "text-red-300") : ""}`}
        >
          {totalNet < 0
            ? `- $${Math.abs(totalNet).toFixed(2)}`
            : `$${totalNet.toFixed(2)}`}
        </span>
      </div>

      {isBlue && selectedCoinCount > 0 && (
        <div className="mt-3 md:mt-4 bg-blue-400/30 rounded-lg px-3 py-2 text-[11px] md:text-sm text-white">
          🎉 You are going to save upto{" "}
          <span className="font-bold">$ {savings.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}

export default CapitalGainsCard;
