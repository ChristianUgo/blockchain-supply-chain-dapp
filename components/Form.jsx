import React, { useContext, useState } from "react";
import { SupplyChainContext } from "../Context/SupplyChainContext";

const Form = ({ createShipmentModel, createShipment, setCreateShipmentModel }) => {
  const { loading } = useContext(SupplyChainContext);
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: "",
  });

  const createItem = async () => {
    try {
      await createShipment(shipment);
    } catch (error) {
      console.log("Error creating shipment transaction context:", error);
    }
  };

  return createShipmentModel ? (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md border border-slate-800 rounded-2xl bg-slate-900/90 shadow-2xl overflow-hidden p-6 md:p-8">
        
        {/* Decorative Grid Accent */}
        <div className="absolute top-0 right-0 -mt-6 -mr-6 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        
        {/* Header Block */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div>
            <h3 className="text-white text-xl font-black tracking-tight">
              Initialize Freight Contract
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Deploy a new immutable logistical tracking state onto the ledger network.
            </p>
          </div>
          <button
            onClick={() => setCreateShipmentModel(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Operational Entry Forms */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 font-mono text-sm">
          
          {/* Target Base Address */}
          <div>
            <label className="block text-slate-300 font-sans font-bold text-xs uppercase tracking-wider mb-2">
              Destination Base (Receiver)
            </label>
            <input
              type="text"
              placeholder="0x71C... or ENS name"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 text-emerald-400 placeholder-slate-600 font-mono text-sm focus:border-emerald-500/50 focus:outline-none transition-colors"
              onChange={(e) => setShipment({ ...shipment, receiver: e.target.value })}
            />
          </div>

          {/* Temporal Timestamp Input */}
          <div>
            <label className="block text-slate-300 font-sans font-bold text-xs uppercase tracking-wider mb-2">
              Manifest Pickup Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-300 placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none transition-colors"
              onChange={(e) => setShipment({ ...shipment, pickupTime: e.target.value })}
            />
          </div>

          {/* Distance Metric */}
          <div>
            <label className="block text-slate-300 font-sans font-bold text-xs uppercase tracking-wider mb-2">
              Distance Range Metrics
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-300 placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none transition-colors"
                onChange={(e) => setShipment({ ...shipment, distance: e.target.value })}
              />
              <span className="absolute right-4 top-2.5 text-xs text-slate-500 font-sans font-bold">KM</span>
            </div>
          </div>

          {/* Transit Gas Cost Fee */}
          <div>
            <label className="block text-slate-300 font-sans font-bold text-xs uppercase tracking-wider mb-2">
              Freight Gas Fare Allocation
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                placeholder="0.00"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-100 placeholder-slate-600 font-bold focus:border-emerald-500/50 focus:outline-none transition-colors"
                onChange={(e) => setShipment({ ...shipment, price: e.target.value })}
              />
              <span className="absolute right-4 top-2.5 text-xs text-emerald-400 font-sans font-black">ETH</span>
            </div>
          </div>

          {/* Broadcast Transaction Trigger */}
          <button
            onClick={() => createItem()}
            disabled={loading}
            className={`w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 font-black rounded-xl text-sm transition-all
${
  loading
    ? "bg-slate-700 text-slate-400 cursor-not-allowed opacity-70"
    : "text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-500 hover:opacity-90 active:scale-95"
}`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? "Processing Transaction..." : "Broadcast Node Manifest"}
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default Form;
