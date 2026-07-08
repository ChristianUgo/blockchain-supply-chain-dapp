import React from "react";

const Services = ({
  setOpenProfile,
  setCreateShipmentModel,
  setStartModal,
  setCompleteModal,
  setGetModal,
}) => {
  const team = [
    { title: "Complete Shipment", desc: "Execute final delivery payouts and close escrow." },
    { title: "Get Shipment", desc: "Query real-time metadata and trace historical routes." },
    { title: "Start Shipment", desc: "Authorize cargo dispatch and change node status." },
    { title: "User Profile", desc: "View wallet credentials and local network balances." },
    { title: "Shipment Count", desc: "Monitor total operational volume under custody." },
    { title: "Send Shipment", desc: "Initialize a new freight contract on the blockchain." },
  ];

  const openModelBox = (text) => {
    if (text === "Complete Shipment") setCompleteModal(true);
    else if (text === "Get Shipment") setGetModal(true);
    else if (text === "Start Shipment") setStartModal(true);
    else if (text === "User Profile") setOpenProfile(true);
    else if (text === "Send Shipment") setCreateShipmentModel(true);
  };

  return (
    <section className="py-10 border-b border-slate-800 bg-slate-950/20">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-md mb-8">
  <h2 className="text-2xl font-black tracking-tight text-slate-100 sm:text-3xl">
    Logistical Terminal Nodes
  </h2>
  <p className="text-sm mt-2 text-slate-400 font-medium">
    Select an operational command block below to broadcast state changes directly to the deployment registry.
  </p>
</div>

        <div className="mt-10">
          <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {team.map((item, i) => (
              <li
                key={i}
                onClick={() => openModelBox(item.title)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm p-5 hover:border-emerald-400 hover:bg-slate-900/90 transition-all duration-300 shadow-xl flex flex-col justify-between h-48"
              >
                {/* Background Grid Accent Effect */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-emerald-500/20 blur-xl transition-colors" />

                <div>
                  <div className="flex items-center justify-between">
                    {/* Hardcoded absolute custom colors for absolute contrast */}
                    <span className="text-xs font-mono font-bold text-[#10B981] tracking-wider uppercase bg-[#10B981]/20 px-2 py-0.5 rounded border border-[#10B981]/30">
                      Node_0{i + 1}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-slate-400 group-hover:bg-emerald-400 transition-colors duration-300" />
                  </div>

                  {/* Hardcoded Pure White for Headers */}
                  <h4 className="text-[#F8FAFC] font-black text-lg mt-3 group-hover:text-emerald-300 transition-colors duration-200">
                    {item.title}
                  </h4>
                  {/* Hardcoded Bright Off-White for Descriptions */}
                  <p className="text-[#E2E8F0] font-semibold text-xs mt-2 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                {/* Hardcoded Pure White for CTA Link */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-[#F8FAFC] group-hover:text-emerald-300 transition-colors">
                  <span>Initialize Component</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 text-emerald-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;