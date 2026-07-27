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
      <div className="max-w-screen-xl mx-auto px-4 py-12 md:px-8">
        <div className="justify-between gap-10 sm:flex">
          <div className="max-w-md space-y-4">
            <div className="text-lg font-black tracking-wider text-emerald-400">
              CHAINTRAC LOGISTICS
            </div>
            <p className="text-sm font-semibold leading-relaxed text-emerald-100/80">
              Immutable end-to-end telemetry and automated financial settlement
              architectures built directly onto decentralized blockchain runtimes.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-emerald-300">
              {footerNavs.map((item, idx) => (
                <li
                  key={idx}
                  className="transition-colors duration-150 hover:text-white"
                >
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 min-w-[120px] font-semibold sm:mt-0">
            <p className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Node Endpoints
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 font-normal">
              <a
                href="#"
                className="inline-block opacity-80 transition-opacity hover:opacity-100"
              >
                <Fot1 />
              </a>
              <a
                href="#"
                className="inline-block opacity-80 transition-opacity hover:opacity-100"
              >
                <Fot2 />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900/60 pt-8 text-xs font-mono md:flex-row">
          <p className="font-bold text-emerald-200/70">
            © 2026 ChainTrac Terminal. Secured by cryptographic consensus mechanisms.
          </p>
          <div className="flex gap-4">
            <span className="text-emerald-400">● Polygon Amoy RPC Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
