import React, { useState } from "react";

const CompleteShipment = ({ completeModal, completeShipment, setCompleteModal }) => {
  const [completeObj, setCompleteObj] = useState({
    receiver: "",
    index: "",
  });

  const [loading, setLoading] = useState(false);

  const executeCompletion = async () => {
    setLoading(true);

    try {
      await completeShipment(completeObj);
    } finally {
      setLoading(false);
    }
  };


  return completeModal ? (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md border border-slate-800 rounded-2xl bg-slate-900/90 shadow-2xl overflow-hidden p-6 md:p-8">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div>
            <h3 className="text-white text-xl font-black tracking-tight">
              Execute Settlement Close
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Finalize destination receipt and release escrowed gas allocations.
            </p>
          </div>
          <button
            onClick={() => setCompleteModal(false)}
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
              Receiver Base Address
            </label>
            <input
              type="text"
              placeholder="0x71C..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 text-emerald-400 placeholder-slate-600 font-mono text-sm focus:border-emerald-500/50 focus:outline-none transition-colors"
              onChange={(e) => setCompleteObj({ ...completeObj, receiver: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-slate-300 font-sans font-bold text-xs uppercase tracking-wider mb-2">
              Ledger ID Index
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-300 placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none transition-colors"
              onChange={(e) => setCompleteObj({ ...completeObj, index: e.target.value })}
            />
          </div>

          <button
            type="button"
            onClick={executeCompletion}
            disabled={loading}
            className={`w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 font-black rounded-xl text-sm transition-all
  ${loading
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-500 hover:opacity-90 active:scale-95 shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
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

            <span>
              {loading
                ? "Processing Transaction..."
                : "Finalize Node Delivery"}
            </span>
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default CompleteShipment;