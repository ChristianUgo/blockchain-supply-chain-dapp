import React from "react";

const Services = ({
  setOpenProfile,
  setCreateShipmentModel,
  setStartModal,
  setCompleteModal,
  setGetModal,
  allShipmentsState = [],
}) => {
  const shipments = Array.isArray(allShipmentsState) ? allShipmentsState : [];

  const stats = [
    {
      label: "Total Shipments",
      value: shipments.length,
      accent: "text-emerald-300",
      detail: "Registry volume",
    },
    {
      label: "In Transit",
      value: shipments.filter((shipment) => Number(shipment.status) === 1).length,
      accent: "text-amber-300",
      detail: "Active routes",
    },
    {
      label: "Delivered",
      value: shipments.filter((shipment) => Number(shipment.status) === 2).length,
      accent: "text-cyan-300",
      detail: "Closed routes",
    },
    {
      label: "Escrowed",
      value: shipments.filter((shipment) => !shipment.isPaid).length,
      accent: "text-rose-300",
      detail: "Pending settlement",
    },
  ];

  const commands = [
    {
      title: "Send Shipment",
      desc: "Initialize a new freight contract on the blockchain.",
      code: "Create",
      accent: "emerald",
    },
    {
      title: "Start Shipment",
      desc: "Authorize cargo dispatch and change node status.",
      code: "Route",
      accent: "amber",
    },
    {
      title: "Complete Shipment",
      desc: "Execute final delivery payouts and close escrow.",
      code: "Close",
      accent: "emerald",
    },
    {
      title: "Get Shipment",
      desc: "Query real-time metadata and trace historical routes.",
      code: "Query",
      accent: "cyan",
    },
    {
      title: "User Profile",
      desc: "View wallet credentials and local network balances.",
      code: "Wallet",
      accent: "violet",
    },
    {
      title: "Shipment Count",
      desc: "Monitor total operational volume under custody.",
      code: "Stats",
      accent: "slate",
    },
  ];

  const accentClasses = {
    amber: {
      badge: "text-amber-300 bg-amber-400/10 border-amber-400/25",
      glow: "bg-amber-400/10",
      hover: "group-hover:text-amber-200",
    },
    cyan: {
      badge: "text-cyan-300 bg-cyan-400/10 border-cyan-400/25",
      glow: "bg-cyan-400/10",
      hover: "group-hover:text-cyan-200",
    },
    emerald: {
      badge: "text-emerald-300 bg-emerald-400/10 border-emerald-400/25",
      glow: "bg-emerald-400/10",
      hover: "group-hover:text-emerald-200",
    },
    slate: {
      badge: "text-slate-300 bg-slate-400/10 border-slate-400/20",
      glow: "bg-slate-400/10",
      hover: "group-hover:text-slate-100",
    },
    violet: {
      badge: "text-violet-300 bg-violet-400/10 border-violet-400/25",
      glow: "bg-violet-400/10",
      hover: "group-hover:text-violet-200",
    },
  };

  const openModelBox = (text) => {
    if (text === "Complete Shipment") setCompleteModal(true);
    else if (text === "Get Shipment") setGetModal(true);
    else if (text === "Start Shipment") setStartModal(true);
    else if (text === "User Profile") setOpenProfile(true);
    else if (text === "Send Shipment") setCreateShipmentModel(true);
    else if (text === "Shipment Count") {
      document.getElementById("registry-ledger")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="dashboard-console" className="scroll-mt-24 border-b border-slate-800/80 bg-slate-950/20">
      <div className="max-w-screen-xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Localhost Network Active
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-50 sm:text-5xl">
              Supply Chain Operations Console
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Monitor shipment lifecycle events, dispatch freight, and settle delivery records from one contract-backed command center.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setCreateShipmentModel(true)}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-3 text-sm font-black text-slate-950 shadow-[0_12px_30px_rgba(16,185,129,0.18)] transition-all hover:opacity-90 active:scale-95"
              >
                New Shipment
              </button>
              <button
                onClick={() => setOpenProfile(true)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-bold text-slate-200 transition-all hover:border-emerald-400/50 hover:text-emerald-300 active:scale-95"
              >
                Wallet Profile
              </button>
            </div>
          </div>

          <div id="dashboard-analytics" className="scroll-mt-24 grid grid-cols-2 gap-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/20">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {item.label}
                </p>
                <div className="mt-3 flex items-end justify-between gap-2">
                  <span className={`text-3xl font-black ${item.accent}`}>{item.value}</span>
                  <span className="text-right text-[11px] font-semibold text-slate-500">
                    {item.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-100">
                Command Nodes
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-400">
                Broadcast contract actions and inspect registry state.
              </p>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commands.map((item) => {
              const accent = accentClasses[item.accent];

              return (
                <li
                  key={item.title}
                  onClick={() => openModelBox(item.title)}
                  className="group relative flex min-h-[168px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/55 p-5 shadow-xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-slate-900/90"
                >
                  <div className={`pointer-events-none absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full blur-2xl ${accent.glow}`} />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-wider ${accent.badge}`}>
                        {item.code}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-slate-600 transition-colors duration-300 group-hover:bg-emerald-300" />
                    </div>
                    <h4 className={`mt-4 text-lg font-black text-slate-50 transition-colors duration-200 ${accent.hover}`}>
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-400">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-xs font-bold text-slate-300 transition-colors group-hover:text-emerald-300">
                    <span>Open Command</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform text-emerald-400 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
