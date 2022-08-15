import { providers } from "ethers";
import { useMemo } from "react";
import type { ReactNode } from "react";
import { allChains, WagmiProvider } from "wagmi";
import type { Connector } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const getConnectors = (chainId: string): Connector[] => {
  const chain = allChains.find((chain) => chain.id === Number(chainId));

  if (!chain) {
    throw new Error("CHAIN_ID not found: " + chainId);
  }

  return [
    new InjectedConnector({
      chains: [chain],
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      chains: [chain],
      options: {
        infuraId: window.ENV.INFURA_PROJECT_ID,
        qrcode: true,
      },
    }),
  ];
};

const Wagmi = ({ children }: { children: ReactNode }) => {
  const connectors = useMemo(() => getConnectors(window.ENV.CHAIN_ID), []);
  const ethersProvider = useMemo(
    () => new providers.JsonRpcProvider(window.ENV.RPC_URL),
    []
  );

  return (
    <WagmiProvider connectors={connectors} provider={ethersProvider}>
      {children}
    </WagmiProvider>
  );
};

export default Wagmi;
