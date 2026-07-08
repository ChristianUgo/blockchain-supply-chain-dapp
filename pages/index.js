import React, { useState, useEffect, useContext } from "react";

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
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
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
  );
};

export default Index;