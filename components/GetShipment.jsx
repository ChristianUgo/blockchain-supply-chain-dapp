import React, { useState } from "react";

const GetShipment = ({ getModal, setGetModal, allShipmentsState = [] }) => {
  const [index, setIndex] = useState("");
  const [singleShipmentData, setSingleShipmentData] = useState();
  const [queryError, setQueryError] = useState("");

  const getShipmentData = () => {
    const shipmentIndex = Number(index);

    if (!Number.isInteger(shipmentIndex) || shipmentIndex < 0) {
      setSingleShipmentData();
      setQueryError("Enter a valid ledger index number.");
      return;
    }

    const shipment = allShipmentsState[shipmentIndex];

    if (!shipment) {
      setSingleShipmentData();
      setQueryError(`No shipment found at ledger index ${shipmentIndex}.`);
      return;
    }

    setQueryError("");
    setSingleShipmentData({
      ...shipment,
      ledgerIndex: shipmentIndex,
    });
  };

  const convertTime = (txtTime) => {
    if (!txtTime) return "N/A";
    const newTime = new Date(txtTime);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(newTime);
  };

  const getStatusLabel = (status) => {
    if (Number(status) === 0) return "Manifested";
    if (Number(status) === 1) return "In Transit";
    return "Executed";
  };

  return getModal ? (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md border border-slate-800 rounded-2xl bg-slate-900/90 shadow-2xl overflow-hidden p-6 md:p-8">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div>
            <h3 className="text-white text-xl font-black tracking-tight">
              Query Freight Registry
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Lookup metadata parameters recorded from an explicit transaction index.
            </p>
          </div>
          <button
            onClick={() => setGetModal(false)}
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
              Ledger ID Index
            </label>
            <input
              type="number"
              value={index}
              placeholder="0"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 text-cyan-400 placeholder-slate-600 font-mono text-sm focus:border-cyan-500/50 focus:outline-none transition-colors"
              onChange={(e) => {
                setIndex(e.target.value);
                setQueryError("");
              }}
            />
          </div>

          <button
            onClick={() => getShipmentData()}
            className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 text-slate-950 font-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 active:scale-98 transition-all rounded-xl text-sm shadow-[0_4px_20px_rgba(34,211,238,0.15)]"
          >
            Parse Registry Node
          </button>
        </form>

        {queryError && (
          <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs font-bold text-amber-300">
            {queryError}
          </div>
        )}

        {singleShipmentData && (
          <div className="mt-6 p-4 border border-slate-800 bg-slate-950/40 rounded-xl space-y-2 text-xs text-slate-300">
            <p><span className="text-slate-500">Ledger Index:</span> {singleShipmentData.ledgerIndex}</p>
            <p className="truncate"><span className="text-slate-500">Sender:</span> {singleShipmentData.sender}</p>
            <p className="truncate"><span className="text-slate-500">Receiver:</span> {singleShipmentData.receiver}</p>
            <p><span className="text-slate-500">Pickup:</span> {convertTime(singleShipmentData.pickupTime)}</p>
            <p><span className="text-slate-500">Delivery:</span> {convertTime(singleShipmentData.deliveryTime)}</p>
            <p><span className="text-slate-500">Distance:</span> {singleShipmentData.distance} km</p>
            <p><span className="text-slate-500">Cost:</span> {singleShipmentData.price} POL</p>
            <p><span className="text-slate-500">Status:</span> {getStatusLabel(singleShipmentData.status)}</p>
            <p><span className="text-slate-500">Settlement:</span> {singleShipmentData.isPaid ? "Settled" : "Escrowed"}</p>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default GetShipment;
