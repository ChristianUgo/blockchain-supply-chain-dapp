import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import supplyChainJSON from "./SupplyChain.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SUPPLY_CHAIN_ADDRESS;
const CONTRACT_ABI = supplyChainJSON.abi;
const AMOY_CHAIN_ID = "0x13882";
const AMOY_MIN_PRIORITY_FEE = ethers.utils.parseUnits("25", "gwei");
const AMOY_MIN_MAX_FEE = ethers.utils.parseUnits("50", "gwei");

const AMOY_NETWORK = {
  chainId: AMOY_CHAIN_ID,
  chainName: "Polygon Amoy",
  nativeCurrency: {
    name: "POL",
    symbol: "POL",
    decimals: 18,
  },
  rpcUrls: ["https://polygon-amoy-bor-rpc.publicnode.com"],
  blockExplorerUrls: ["https://amoy.polygonscan.com"],
};

const getEthereum = () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask is required to use this application.");
  }

  return window.ethereum;
};

const ensureAmoyNetwork = async () => {
  const ethereum = getEthereum();

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: AMOY_CHAIN_ID }],
    });
  } catch (error) {
    if (error?.code !== 4902) throw error;

    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [AMOY_NETWORK],
    });
  }

  return ethereum;
};

const fetchContract = (signerOrProvider) => {
  if (!CONTRACT_ADDRESS || !ethers.utils.isAddress(CONTRACT_ADDRESS)) {
    throw new Error(
      "The Supply Chain contract address is not configured for this deployment."
    );
  }

  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
};

const getErrorMessage = (error) =>
  error?.data?.message ||
  error?.error?.message ||
  error?.reason ||
  error?.message ||
  "Transaction failed.";

const getAmoyFeeOverrides = async (provider) => {
  const feeData = await provider.getFeeData();
  const maxPriorityFeePerGas =
    feeData.maxPriorityFeePerGas?.gt(AMOY_MIN_PRIORITY_FEE)
      ? feeData.maxPriorityFeePerGas
      : AMOY_MIN_PRIORITY_FEE;
  const maxFeePerGas = feeData.maxFeePerGas?.gt(AMOY_MIN_MAX_FEE)
    ? feeData.maxFeePerGas
    : AMOY_MIN_MAX_FEE;

  return { maxPriorityFeePerGas, maxFeePerGas };
};

export const SupplyChainContext = createContext();

export const SupplyChainProvider = ({ children }) => {
  const DappName = "Supply Chain Management Dapp";
  const [currentUser, setCurrentUser] = useState("");
  const [allShipments, setAllShipments] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      const ethereum = await ensureAmoyNetwork();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0] || "");
      return accounts[0] || "";
    } catch (error) {
      toast.error(getErrorMessage(error));
      return "";
    }
  };

  const createShipment = async (items) => {
    const { receiver, pickupTime, distance, price } = items;
    setLoading(true);

    try {
      const ethereum = await ensureAmoyNetwork();
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const feeOverrides = await getAmoyFeeOverrides(provider);
      const payment = ethers.utils.parseEther(price.toString());

      const transaction = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        payment,
        { value: payment, ...feeOverrides }
      );

      await transaction.wait();
      toast.success("Shipment created successfully!");
      await getAllShipments();
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const startShipment = async (startArgs) => {
    const { receiver, index } = startArgs;
    setLoading(true);

    try {
      const ethereum = await ensureAmoyNetwork();
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const sender = await signer.getAddress();
      const contract = fetchContract(signer);
      const feeOverrides = await getAmoyFeeOverrides(provider);

      const transaction = await contract.startShipment(
        sender,
        receiver,
        index,
        feeOverrides
      );

      await transaction.wait();
      await getAllShipments();
      toast.success("Shipment dispatched successfully!");
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const completeShipment = async (items) => {
    const { receiver, index } = items;
    let loadingToast;
    setLoading(true);

    try {
      const ethereum = await ensureAmoyNetwork();
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const sender = await signer.getAddress();
      const contract = fetchContract(signer);
      const feeOverrides = await getAmoyFeeOverrides(provider);

      loadingToast = toast.loading("Waiting for blockchain confirmation...");

      const transaction = await contract.completeShipment(
        sender,
        receiver,
        index,
        feeOverrides
      );

      await transaction.wait();
      await getAllShipments();
      toast.success("Shipment completed successfully!");
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    } finally {
      if (loadingToast) toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const getAllShipments = async () => {
    try {
      const ethereum = getEthereum();
      const chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId?.toLowerCase() !== AMOY_CHAIN_ID) {
        setAllShipments([]);
        return [];
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
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
      return cleanShipments;
    } catch (error) {
      console.error("Failed to fetch shipments:", error);
      setAllShipments([]);
      return [];
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return undefined;

    const ethereum = window.ethereum;

    const restoreWallet = async () => {
      try {
        const [accounts, chainId] = await Promise.all([
          ethereum.request({ method: "eth_accounts" }),
          ethereum.request({ method: "eth_chainId" }),
        ]);

        if (accounts.length > 0 && chainId?.toLowerCase() === AMOY_CHAIN_ID) {
          setCurrentUser(accounts[0]);
        }
      } catch (error) {
        console.error("Unable to restore wallet session:", error);
      }
    };

    const handleAccountsChanged = (accounts) => {
      setCurrentUser(accounts[0] || "");
      if (accounts.length === 0) setAllShipments([]);
    };

    const handleChainChanged = (chainId) => {
      if (chainId?.toLowerCase() !== AMOY_CHAIN_ID) {
        setCurrentUser("");
        setAllShipments([]);
      }
    };

    restoreWallet();
    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  useEffect(() => {
    if (currentUser) getAllShipments();
  }, [currentUser]);

  return (
    <SupplyChainContext.Provider
      value={{
        DappName,
        currentUser,
        allShipments,
        loading,
        setLoading,
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
