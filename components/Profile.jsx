import React, { useCallback, useState, useEffect } from "react";
import { ethers } from "ethers";

const Profile = ({ openProfile, setOpenProfile, currentUser }) => {
  const [accountBalance, setAccountBalance] = useState("0.00");
  const [copied, setCopied] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (typeof window !== "undefined" && window.ethereum && currentUser) {
      try {
        const hexBalance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [currentUser, "latest"],
        });
        const eth = ethers.utils.formatEther(hexBalance);
        setAccountBalance(Number(eth).toFixed(6));
      } catch (err) {
        console.log("Error querying node account balance parameters:", err);
      }
    }
  }, [currentUser]);

  // Fetch balance dynamically using standard window.ethereum injection if active
  useEffect(() => {
    if (openProfile) fetchBalance();
  }, [fetchBalance, openProfile]);

  const copyAddress = async () => {
    if (!currentUser || typeof navigator === "undefined" || !navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(currentUser);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.log("Error copying wallet address:", err);
    }
  };

  return openProfile ? (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end">
      {/* Slide-out Panel Wrapper */}
      <div className="w-full max-w-md h-full border-l border-slate-800 bg-slate-900/95 shadow-2xl p-6 md:p-8 flex flex-col justify-between relative animate-slide-in">

        {/* Subtle Decorative Ambient Background Glow */}
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 blur-3xl pointer-events-none" />

        <div>
          {/* Header Panel Control */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
            <div>
              <h3 className="text-white text-xl font-black tracking-tight">
                Wallet Profile
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                View your connected wallet address and local test balance.
              </p>
            </div>
            <button
              onClick={() => setOpenProfile(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Account Metrics Section */}
          <div className="space-y-6 font-mono text-sm">
            {/* Identity Status Chip */}
            <div className="flex items-center justify-between bg-slate-950/40 border border-slate-800/60 p-4 rounded-xl">
              <span className="text-slate-400 font-sans text-xs uppercase tracking-wider font-bold">Network Status</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                Connected to Localhost
              </span>
            </div>

            {/* Cryptographic Key Base */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="block text-slate-400 font-sans font-bold text-xs uppercase tracking-wider">
                  Wallet Address
                </label>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="text-xs font-bold text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="w-full px-4 py-3 border border-slate-800 bg-slate-950/60 text-emerald-400 break-all rounded-xl select-all font-mono text-xs leading-relaxed">
                {currentUser || "0x0000000000000000000000000000000000000000"}
              </div>
            </div>

            {/* Account Allocation Resource Metrics */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="block text-slate-400 font-sans font-bold text-xs uppercase tracking-wider">
                  POL Balance
                </label>
                <button
                  type="button"
                  onClick={fetchBalance}
                  className="text-xs font-bold text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  Refresh
                </button>
              </div>
              <div className="flex items-baseline justify-between w-full px-4 py-3 border border-slate-800 bg-slate-950/60 rounded-xl">
                <span className="text-white font-black text-2xl tabular-nums">{accountBalance}</span>
                <span className="text-xs text-emerald-400 font-sans font-black">POL Gas</span>
              </div>
              <p className="mt-2 text-xs font-sans text-slate-500">
                Polygon Amoy uses test POL for transaction fees.
              </p>
            </div>

            {/* Simulated Additional Supply Chain Cargo Metric */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-slate-800/60 bg-slate-950/30 rounded-xl">
                <span className="block text-slate-500 font-sans text-[10px] uppercase tracking-wider font-bold">Role Cleared</span>
                <span className="block text-white font-bold text-sm mt-1">Contract Owner</span>
              </div>
              <div className="p-4 border border-slate-800/60 bg-slate-950/30 rounded-xl">
                <span className="block text-slate-500 font-sans text-[10px] uppercase tracking-wider font-bold">Active Nodes</span>
                <span className="block text-cyan-400 font-bold text-sm mt-1">6 Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Authorization / Sign-out Indicator */}
        <div className="border-t border-slate-800 pt-6 mt-6 flex items-center justify-between text-xs text-slate-500">
          <span>Session Root Hash: V2.0.0</span>
          <button
            onClick={() => setOpenProfile(false)}
            className="text-slate-400 hover:text-emerald-400 transition-colors font-bold font-sans"
          >
            Close Panel &rarr;
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;
