import React, { useMemo, useState } from "react";

const Table = ({ allShipmentsState, setStartModal }) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [copiedAddress, setCopiedAddress] = useState("");

  const shipments = useMemo(
    () => (Array.isArray(allShipmentsState) ? allShipmentsState : []),
    [allShipmentsState]
  );

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

  const copyAddress = async (address) => {
    if (!address || typeof navigator === "undefined" || !navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(""), 1500);
    } catch (error) {
      console.log("Error copying ledger address:", error);
    }
  };

  const filteredShipments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return shipments.map((shipment, ledgerIndex) => ({
      ...shipment,
      ledgerIndex,
    })).filter((shipment) => {
      const statusLabel = getStatusLabel(shipment.status).toLowerCase();
      const matchesStatus = statusFilter === "all" || statusLabel === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        shipment.sender?.toLowerCase().includes(normalizedQuery) ||
        shipment.receiver?.toLowerCase().includes(normalizedQuery) ||
        shipment.price?.toString().toLowerCase().includes(normalizedQuery) ||
        shipment.distance?.toString().toLowerCase().includes(normalizedQuery) ||
        statusLabel.includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, shipments, statusFilter]);

  return (
    <div id="registry-ledger" className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14 scroll-mt-24">
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
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-slate-200 font-semibold tracking-wide text-sm bg-slate-900 border border-slate-700 hover:border-emerald-400/50 hover:text-emerald-300 hover:bg-slate-800 active:scale-95 transition-all rounded-xl shadow-lg"
          >
            Dispatch Shipment
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sender, receiver, status, distance, or POL value"
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 pl-11 pr-4 text-sm font-medium text-slate-200 placeholder-slate-600 outline-none transition-colors focus:border-emerald-400/50"
          />
        </div>

        <div className="grid grid-cols-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 text-xs font-black text-slate-400">
          {[
            { label: "All", value: "all" },
            { label: "Manifested", value: "manifested" },
            { label: "Transit", value: "in transit" },
            { label: "Executed", value: "executed" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setStatusFilter(item.value)}
              className={`px-3 py-3 transition-colors ${
                statusFilter === item.value
                  ? "bg-emerald-400 text-slate-950"
                  : "hover:bg-slate-900 hover:text-emerald-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/50 backdrop-blur-sm shadow-xl shadow-slate-950/30">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/40 px-5 py-3 text-xs font-bold text-slate-500">
          <span>{filteredShipments.length} of {shipments.length} records visible</span>
          <span className="text-emerald-400">Live Contract Data</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-slate-900/80 text-slate-300 font-semibold tracking-wider text-xs uppercase border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Index</th>
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
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-14 font-sans">
                    <div className="mx-auto max-w-sm">
                      <p className="text-base font-black text-slate-300">
                        No matching ledger records
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-500">
                        Adjust the search or status filter to widen the registry view.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredShipments.map((shipment) => (
                  <tr key={`${shipment.sender}-${shipment.receiver}-${shipment.ledgerIndex}`} className="hover:bg-slate-900/40 transition-colors group">
                    <td className="px-6 py-4 font-sans">
                      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-slate-700 bg-slate-900 px-2 text-xs font-black text-emerald-300">
                        {shipment.ledgerIndex}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex max-w-[180px] items-center gap-2">
                        <span className="truncate text-emerald-400 font-medium">
                          {shipment.sender}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyAddress(shipment.sender)}
                          className="shrink-0 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] font-bold text-slate-400 transition-colors hover:border-emerald-400/50 hover:text-emerald-300"
                        >
                          {copiedAddress === shipment.sender ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex max-w-[180px] items-center gap-2">
                        <span className="truncate text-cyan-400 font-medium">
                          {shipment.receiver}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyAddress(shipment.receiver)}
                          className="shrink-0 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] font-bold text-slate-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                        >
                          {copiedAddress === shipment.receiver ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-sans">{convertTime(shipment.pickupTime)}</td>
                    <td className="px-6 py-4 font-sans font-medium">{shipment.distance} <span className="text-xs text-slate-500 font-mono">KM</span></td>
                    <td className="px-6 py-4 font-bold text-slate-100">{shipment.price} <span className="text-xs text-emerald-400 font-sans">POL</span></td>
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
                      {Number(shipment.status) === 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">Manifested</span>
                      ) : Number(shipment.status) === 1 ? (
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
