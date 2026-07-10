import React, { useState, useContext } from "react";

// INTERNAL COMPONENT IMPORTS
import {
  NavBar,
  Footer,
  Services,
  Table,
  Form,
  Profile,
  GetShipment,
  StartShipment,
  CompleteShipment,
} from "../components";

// WALLET CONTEXT HANDSHAKES
import { SupplyChainContext } from "../Context/SupplyChainContext";

const Index = () => {
  // Pull live state parameters from the global blockchain context provider
  const {
    currentUser,
    allShipments,
    connectWallet,
    createShipment,
    startShipment,
    completeShipment,
  } = useContext(SupplyChainContext);

  // LOCAL INTERFACE MODAL CONTROLLERS
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModal, setGetModal] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
      <div className="relative z-10">
      {/* Top Asset Command Navigation Header */}
      <NavBar 
        currentUser={currentUser} 
        connectWallet={connectWallet} 
        setOpenProfile={setOpenProfile}
      />

      {/* High-Tech Operational Interaction Cards */}
      <Services
        setOpenProfile={setOpenProfile}
        setCreateShipmentModel={setCreateShipmentModel}
        setStartModal={setStartModal}
        setCompleteModal={setCompleteModal}
        setGetModal={setGetModal}
        allShipmentsState={allShipments}
      />

      {/* Live Distributed Registry Ledger Table */}
      <Table 
        allShipmentsState={allShipments} 
        setStartModal={setStartModal} 
      />

      {/* FLOATING ACTION GLASS CONTEXT MODALS */}
      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />

      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
      />

      <StartShipment
        startModal={startModal}
        startShipment={startShipment}
        setStartModal={setStartModal}
      />

      <CompleteShipment
        completeModal={completeModal}
        completeShipment={completeShipment}
        setCompleteModal={setCompleteModal}
      />

      <GetShipment 
        getModal={getModal} 
        setGetModal={setGetModal} 
        allShipmentsState={allShipments}
      />

      {/* Structural Base Dashboard Footer */}
      <Footer />
      </div>
    </div>
  );
};

export default Index;
