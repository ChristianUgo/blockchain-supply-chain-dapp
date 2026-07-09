import React, { useContext, useState } from "react";
import { SupplyChainContext } from "../Context/SupplyChainContext";

const StartShipment = ({ startModal, startShipment, setStartModal }) => {
  const { loading } = useContext(SupplyChainContext);
  const [getProduct, setGetProduct] = useState({
    receiver: "", // Fixed typo spelling from 'reveiver' to 'receiver'
    index: "",
  });

  const startTransit = () => {
    startShipment(getProduct);
  };

  return startModal ? (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md border border-slate-800 rounded-2xl bg-slate-900/90 shadow-2xl overflow-hidden p-6 md:p-8">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div>
            <h3 className="text-white text-xl font-black tracking-tight">
              Dispatch Freight Cargo
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Transition a contract record node state directly to 'In Transit'.
            </p>
          </div>
          <button
            onClick={() => setStartModal(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 font-mono text-sm">
          <div>
            <label className="block text-slate-300 font-sans font-bold text-xs uppercase tracking-wider mb-2">
              Receiver Target Base
            </label>
            <input
              type="text"
              placeholder="0x71C..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 text-amber-400 placeholder-slate-600 font-mono text-sm focus:border-amber-500/50 focus:outline-none transition-colors"
              onChange={(e) => setGetProduct({ ...getProduct, receiver: e.target.value })} // Fixed tracking variable
            />
          </div>

          <div>
            <label className="block text-slate-300 font-sans font-bold text-xs uppercase tracking-wider mb-2">
              Ledger ID Index
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-300 placeholder-slate-600 focus:border-amber-500/50 focus:outline-none transition-colors"
              onChange={(e) => setGetProduct({ ...getProduct, index: e.target.value })}
            />
          </div>

          <button
            type="button"
            onClick={startTransit}
            disabled={loading}
            className={`w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 font-black rounded-xl text-sm transition-all
${
  loading
    ? "bg-slate-700 text-slate-400 cursor-not-allowed opacity-70"
    : "text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 active:scale-95"
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
            {loading ? "Processing Transaction..." : "Authorize Route Departure"}
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default StartShipment;
