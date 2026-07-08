import React from "react";
import Fot1 from "./SVG/Fot1";
import Fot2 from "./SVG/Fot2";

const Footer = () => {
  const footerNavs = [
    { href: "#", name: "Network Terms" },
    { href: "#", name: "Security Audit" },
    { href: "#", name: "Core Architecture" },
    { href: "#", name: "Developer Node" },
  ];

  return (
    <footer className="mt-20 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-screen-xl mx-auto px-4 py-12 text-slate-400 md:px-8">
        <div className="justify-between sm:flex gap-10">
          <div className="space-y-4 max-w-md">
            <div style={{ color: "#000000" }} className="font-black text-lg tracking-wider">
              CHAINTRAC LOGISTICS
            </div>
            {/* FIXED: Changed description text to black */}
            <p style={{ color: "#000000" }} className="text-sm leading-relaxed font-bold">
              Immutable end-to-end telemetry and automated financial settlement architectures built directly onto decentralized blockchain runtimes.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold">
              {footerNavs.map((item, idx) => (
                /* FIXED: Changed nav link texts to black */
                <li key={idx} style={{ color: "#000000" }} className="hover:text-emerald-600 transition-colors duration-150">
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 font-semibold sm:mt-0 min-w-[120px]">
            {/* FIXED: Changed section title to black */}
            <p style={{ color: "#000000" }} className="text-xs tracking-wider uppercase font-black">Node Endpoints</p>
            <div className="flex items-center gap-3 mt-4 sm:block font-normal space-y-0 sm:space-y-2">
              <a href="#" className="inline-block opacity-80 hover:opacity-100 transition-opacity">
                <Fot1 />
              </a>
              <a href="#" className="inline-block opacity-80 hover:opacity-100 transition-opacity mt-0 sm:mt-2 block">
                <Fot2 />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          {/* FIXED: Changed copyright baseline statement to black */}
          <p style={{ color: "#000000" }} className="font-bold">© 2026 ChainTrac Terminal. Secured by cryptographic consensus mechanisms.</p>
          <div className="flex gap-4">
            <span className="text-emerald-500/70">● RPC Localhost Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;