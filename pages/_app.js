import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { SupplyChainProvider } from "../Context/SupplyChainContext";

function MyApp({ Component, pageProps }) {
  return (
    <SupplyChainProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #334155",
          },
        }}
      />

      <Component {...pageProps} />
    </SupplyChainProvider>
  );
}

export default MyApp;