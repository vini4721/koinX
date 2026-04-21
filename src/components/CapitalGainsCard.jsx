function CapitalGainsCard({
  title,
  gains,
  isBlue,
  savings,
  selectedCoinCount = 0,
}) {
  const stcgNet = gains.stcg.profits - gains.stcg.losses;
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses;
  const totalNet = stcgNet + ltcgNet;

  const bg = isBlue ? "bg-blue-500" : "bg-[#1a2035]";

  return (
    <div className={`flex-1 rounded-xl p-6 ${bg}`}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {/* Column Headers */}
      <div className="flex text-sm text-gray-300 mb-1">
        <span className="flex-1"></span>
        <span className="flex-1 text-right">Short-term</span>
        <span className="flex-1 text-right">Long-term</span>
      </div>

      {/* Profits */}
      <div className="flex py-3 border-b border-white/10 text-sm">
        <span className="flex-1">Profits</span>
        <span className="flex-1 text-right">
          $ {gains.stcg.profits.toFixed(2)}
        </span>
        <span className="flex-1 text-right">
          $ {gains.ltcg.profits.toFixed(2)}
        </span>
      </div>

      {/* Losses */}
      <div className="flex py-3 border-b border-white/10 text-sm">
        <span className="flex-1">Losses</span>
        <span className="flex-1 text-right">
          - $ {gains.stcg.losses.toFixed(2)}
        </span>
        <span className="flex-1 text-right">
          - $ {gains.ltcg.losses.toFixed(2)}
        </span>
      </div>

      {/* Net Capital Gains */}
      <div className="flex py-3 border-b border-white/10 text-sm font-semibold">
        <span className="flex-1">Net Capital Gains</span>
        <span
          className={`flex-1 text-right ${stcgNet < 0 ? "text-red-300" : ""}`}
        >
          {stcgNet < 0
            ? `- $ ${Math.abs(stcgNet).toFixed(2)}`
            : `$ ${stcgNet.toFixed(2)}`}
        </span>
        <span
          className={`flex-1 text-right ${ltcgNet < 0 ? "text-red-300" : ""}`}
        >
          {ltcgNet < 0
            ? `- $ ${Math.abs(ltcgNet).toFixed(2)}`
            : `$ ${ltcgNet.toFixed(2)}`}
        </span>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between mt-4">
        <span className="font-bold text-sm">
          {isBlue ? "Effective Capital Gains:" : "Realised Capital Gains:"}
        </span>
        <span
          className={`text-2xl font-bold ${totalNet < 0 ? "text-red-300" : ""}`}
        >
          {totalNet < 0
            ? `- $${Math.abs(totalNet).toFixed(2)}`
            : `$${totalNet.toFixed(2)}`}
        </span>
      </div>

      {/* Savings line — shown when at least one coin is selected */}
      {isBlue && selectedCoinCount > 0 && (
        <div className="mt-4 bg-blue-400/30 rounded-lg px-4 py-2 text-sm">
          🎉 You are going to save upto{" "}
          <span className="font-bold">$ {savings.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}

export default CapitalGainsCard;
