import React, { useState, useEffect, useContext } from "react";
import { SupplyChainContext } from "../Context/SupplyChainContext";
import Nav1 from "./SVG/Nav1";

const NavBar = () => {
  const [state, setState] = useState(false);
  const { currentUser, connectWallet, setOpenProfile} = useContext(SupplyChainContext);

  const navigation = [
    { title: "Dashboard", path: "#" },
    { title: "Analytics", path: "#" },
    { title: "Registry Ledger", path: "#" },
    { title: "ERC20 Fuel", path: "#" },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-4 md:block">
          <a href="#" className="flex items-center gap-2 font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            <span>CHAINTRAC</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 tracking-normal font-mono font-normal">V1.0</span>
          </a>
          <div className="md:hidden">
            <button className="menu-btn text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-900" onClick={() => setState(!state)}>
              {state ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`flex-1 items-center pb-4 md:pb-0 mt-4 md:mt-0 md:flex ${state ? "block" : "hidden"}`}>
          <ul className="justify-center items-center space-y-4 md:flex md:space-x-8 md:space-y-0 font-medium">
            {navigation.map((item, idx) => (
              <li key={idx} className="text-slate-400 hover:text-emerald-400 text-sm tracking-wide transition-colors duration-200">
                <a href={item.path} className="block py-1">{item.title}</a>
              </li>
            ))}
          </ul>

          <div className="flex-1 justify-end items-center mt-4 space-y-4 md:flex md:space-x-6 md:space-y-0 md:mt-0">
            {currentUser ? (
              <div className="flex items-center gap-2 py-2 px-4 border border-emerald-500/30 bg-slate-900 text-emerald-400 font-mono text-sm rounded-xl md:inline-flex shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {currentUser.slice(0, 6)}...{currentUser.slice(-4)}
              </div>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="w-full md:w-auto flex items-center justify-center gap-x-2 py-2 px-5 text-slate-950 font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-90 active:scale-95 transition-all rounded-xl text-sm shadow-[0_4px_20px_rgba(52,211,153,0.25)]"
              >
                Connect Wallet <Nav1 />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;