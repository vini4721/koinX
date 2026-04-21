import { useState } from "react";

function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-blue-500 rounded-xl mb-6 bg-[#1a2035]">
      {/* Header Row */}
      <button
        className="w-full flex items-center justify-between px-4 py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-blue-400">ℹ️</span>
          <span>Important Notes & Disclaimers</span>
        </div>
        <span className="text-gray-400 text-lg">{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Content — only shows when open */}
      {isOpen && (
        <ul className="px-6 pb-4 text-sm text-gray-300 space-y-2 list-disc">
          <li>
            Tax-loss harvesting is currently not allowed under Indian tax
            regulations. Please consult your tax advisor before making any
            decisions.
          </li>
          <li>
            Tax harvesting does not apply to derivatives or futures. These are
            handled separately as business income under tax rules.
          </li>
          <li>
            Price and market value data is fetched from Coingecko, not from
            individual exchanges. As a result, values may slightly differ.
          </li>
          <li>
            Some countries do not have a short-term / long-term bifurcation. For
            now, we are calculating everything as long-term.
          </li>
          <li>
            Only realized losses are considered for harvesting. Unrealized
            losses in held assets are not counted.
          </li>
        </ul>
      )}
    </div>
  );
}

export default Disclaimer;
