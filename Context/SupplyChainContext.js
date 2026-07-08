import { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORT
import supplyChainJSON from "./SupplyChain.json";
import toast from "react-hot-toast";

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = supplyChainJSON.abi;

// --- FETCHING SMART CONTRACT ---
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    ContractAddress,
    ContractABI,
    signerOrProvider
  );

export const SupplyChainContext = createContext();

export const SupplyChainProvider = ({ children }) => {
  const DappName = "Supply Chain Management Dapp";
  const [currentUser, setCurrentUser] = useState("");
  const [allShipments, setAllShipments] = useState([]);

  // --- CONNECT WALLET FUNCTION ---
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentUser(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // --- CORE FUNCTION: CREATE SHIPMENT ---
  const createShipment = async (items) => {
    const { receiver, pickupTime, distance, price } = items;
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );
      await createItem.wait();
      toast.success("Shipment created successfully!");
      getAllShipments();
    } catch (error) {
      toast.error(error.reason || error.message);
    }
  };

  // --- CORE FUNCTION: START SHIPMENT ---
  const startShipment = async (startArgs) => {
    const { receiver, index } = startArgs;
    try {
      if (typeof window !== "undefined" && window.ethereum) {

        // FORCE MetaMask to switch to your local chain automatically
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x7a69" }], // 31337 in Hexadecimal for Hardhat node
          });
        } catch (switchError) {
          // If the network isn't added to their MetaMask yet, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: "0x7a69",
                chainName: "Hardhat Localhost",
                rpcUrls: ["http://127.0.0.1:8545"],
                nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 }
              }]
            });
          }
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ContractAddress, ContractABI, signer);

        const sender = await signer.getAddress();

        console.log("==================================");
        console.log("Sender :", sender);
        console.log("Receiver :", receiver);
        console.log("Index :", index);
        console.log("==================================");

        const tx = await contract.startShipment(
          sender,
          receiver,
          index
        );

        await tx.wait();

        await getAllShipments();

        toast.success("Shipment dispatched successfully!");
      }
    } catch (error) {
      console.error("Failed to start shipment:", error);
    }
  };

  // --- CORE FUNCTION: COMPLETE SHIPMENT ---
  const completeShipment = async (items) => {
    const { receiver, index } = items;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x7a69" }],
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // sender = currently connected MetaMask account
      const sender = await signer.getAddress();

      const contract = fetchContract(signer);

      console.log("Sender:", sender);
      console.log("Receiver:", receiver);
      console.log("Index:", index);

      const loadingToast = toast.loading(
        "Waiting for blockchain confirmation..."
      );

      const tx = await contract.completeShipment(
        sender,
        receiver,
        index
      );

      // Wait until the transaction is mined
      await tx.wait();

      // Remove loading toast
      toast.dismiss(loadingToast);

      // Success toast
      toast.success("Shipment completed successfully!");

      // Refresh UI
      await getAllShipments();

    } catch (error) {
      console.error("Failed to complete shipment:", error);

      toast.error(error.reason || error.message || "Transaction failed");
    }
  };

  // --- CORE FUNCTION: GET ALL TRANSACTIONS / SHIPMENTS ---
  const getAllShipments = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = fetchContract(provider);

      const shipments = await contract.getAllTransactions();

      const cleanShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));

      setAllShipments(cleanShipments);
    } catch (error) {
      console.error("Failed to fetch shipments:", error);
    }
  };

  // 1. Check if an active wallet session already exists silently on boot
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return;
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setCurrentUser(accounts[0]);
      }
    } catch (error) {
      console.error("Silent session tracking check failed:", error);
    }
  };

  // 2. Trigger runtime checks separately without locking manual interactions
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // 3. Automatically fetch database records only AFTER a user address context turns active
  useEffect(() => {
    if (currentUser) {
      getAllShipments();
    }
  }, [currentUser]);
  useEffect(() => {
    if (!window.ethereum) return;

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener(
        "chainChanged",
        handleChainChanged
      );
    };
  }, []);

  return (
    <SupplyChainContext.Provider
      value={{
        DappName,
        currentUser,
        allShipments,
        connectWallet,
        createShipment,
        startShipment,
        completeShipment,
      }}
    >
      {children}
    </SupplyChainContext.Provider>
  );
};