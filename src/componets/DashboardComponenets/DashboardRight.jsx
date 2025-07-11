import React from "react";

const DashboardRight = () => {
  const shortcutKeys = [
    { label: "SALE BILL", key: "Alt + N" },
    { label: "SALE BILL LIST", key: "Alt + M" },
    { label: "PURCHASE BILL", key: "Alt + P" },
    { label: "ITEM LIST", key: "Alt + I" },
    { label: "LEDGER LIST", key: "Alt + L" },
    { label: "PARTY WISE OUTSTANDING", key: "Alt + O" },
    { label: "RE-ORDER", key: "Ctrl + F1" },
    { label: "RECEIPT", key: "Alt + R" },
    { label: "PAYMENT", key: "Ctrl + F2" },
    { label: "CASH A/C AND BANK A/C", key: "Alt + B" },
    { label: "SALE BILL CHALLAN", key: "Alt + C" },
    { label: "STOCK ISSUE", key: "Alt + K" },
    { label: "STOCK RECEIVE", key: "Alt + U" },
    { label: "BREAKAGE/EXP RECEIVE", key: "Alt + X" },
    { label: "COUNTER SALE", key: "Alt + S" },
  ];
  return (
    <div className="hidden border border-gray-400 rounded-lg xl:block w-64 flex-shrink-0 relative overflow-hidden h-full">
      <div className="bg-white rounded-lg shadow p-2 h-full">
        <div className="text-center font-semibold text-lg mb-3 border-b pb-2 flex items-center justify-center gap-2">
          <span>🖮</span>
          <span>Shortcut Keys</span>
        </div>

        <ul className="text-sm text-gray-800 space-y-2 h-full overflow-y-auto pb-16 no-scrollbar">
          {shortcutKeys.map((item, index) => (
            <li
              key={index}
              className="bg-gray-200 text-center p-2 rounded shadow-sm"
            >
              <div className="font-semibold text-xs">{item.label}</div>
              <div className="text-blue-700 font-bold text-sm">{item.key}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardRight;
