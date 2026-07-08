import React from "react";

const Table = ({ allShipmentsState, setStartModal }) => {
  const convertTime = (txtTime) => {
    if (!txtTime) return "N/A";
    const newTime = new Date(txtTime);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(newTime);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="items-end justify-between md:flex gap-4 border-b border-slate-800 pb-6">
        <div className="max-w-lg">
          <h3 className="text-white text-2xl font-black tracking-tight sm:text-3xl">
            Active Registry Ledger
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            Real-time logistical tracking telemetry synced directly from your distributed smart contract nodes.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setStartModal(true)}
            className="w-full md:w-auto inline-block px-5 py-2.5 text-slate-200 font-semibold tracking-wide text-sm bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 active:scale-98 transition-all rounded-xl shadow-lg"
          >
            Dispatch / Update Status
          </button>
        </div>
      </div>

      <div className="mt-8 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/40 backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-slate-900/80 text-slate-300 font-semibold tracking-wider text-xs uppercase border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Sender Base</th>
                <th className="py-4 px-6">Destination Target</th>
                <th className="py-4 px-6">Manifest Date</th>
                <th className="py-4 px-6">Distance Metric</th>
                <th className="py-4 px-6">Fuel Cost</th>
                <th className="py-4 px-6">Est. Delivery</th>
                <th className="py-4 px-6">Settlement</th>
                <th className="py-4 px-6 text-right">Workflow Telemetry</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-slate-900 font-mono">
              {!allShipmentsState || allShipmentsState.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 font-sans font-medium text-slate-500 tracking-wide">
                    No active freight records parsed in ledger context.
                  </td>
                </tr>
              ) : (
                allShipmentsState.map((shipment, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors group">
                    <td className="px-6 py-4 text-emerald-400 font-medium max-w-[140px] truncate">
                      {shipment.sender}
                    </td>
                    <td className="px-6 py-4 text-cyan-400 font-medium max-w-[140px] truncate">
                      {shipment.receiver}
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-sans">{convertTime(shipment.pickupTime)}</td>
                    <td className="px-6 py-4 font-sans font-medium">{shipment.distance} <span className="text-xs text-slate-500 font-mono">KM</span></td>
                    <td className="px-6 py-4 font-bold text-slate-100">{shipment.price} <span className="text-xs text-emerald-400 font-sans">ETH</span></td>
                    <td className="px-6 py-4 text-slate-400 font-sans">{convertTime(shipment.deliveryTime)}</td>
                    <td className="px-6 py-4 font-sans">
                      {shipment.isPaid ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]">
                          Settled
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Escrowed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-sans">
                      {shipment.status === 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">Manifested</span>
                      ) : shipment.status === 1 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">In Transit</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Executed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;