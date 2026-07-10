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
      <div className="max-w-screen-xl mx-auto px-4 py-12 text-emerald-300 md:px-8">
        <div className="justify-between sm:flex gap-10">
          <div className="space-y-4 max-w-md">
            <div className="font-black text-lg tracking-wider text-emerald-400">
              CHAINTRAC LOGISTICS
            </div>
            <p className="text-sm leading-relaxed font-bold text-emerald-200/85">
              Immutable end-to-end telemetry and automated financial settlement architectures built directly onto decentralized blockchain runtimes.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold">
              {footerNavs.map((item, idx) => (
                <li key={idx} className="text-emerald-300/80 hover:text-emerald-400 transition-colors duration-150">
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 font-semibold sm:mt-0 min-w-[120px]">
            <p className="text-xs tracking-wider uppercase font-black text-emerald-400">
              Node Endpoints
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-5 font-normal">
              <a href="#" className="inline-block opacity-80 hover:opacity-100 transition-opacity">
                <Fot1 />
              </a>
              <a href="#" className="inline-block opacity-80 hover:opacity-100 transition-opacity">
                <Fot2 />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="font-bold text-emerald-300/75">
            &copy; 2026 ChainTrac Terminal. Secured by cryptographic consensus mechanisms.
          </p>
          <div className="flex gap-4">
            <span className="text-emerald-400">&#9679; RPC Localhost Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
