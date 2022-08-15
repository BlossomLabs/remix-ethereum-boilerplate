import { providers } from "ethers";
import type { Chain } from "wagmi";
import { allChains } from "wagmi";

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

const STATIC_PROVIDERS_CACHE = new Map<
  number,
  providers.StaticJsonRpcProvider
>();

const networkExplorerRegex = /([A-Z]+)_EXPLORER_API_KEY/;

const availableExplorers = Object.keys(process.env)
  .filter((key) => networkExplorerRegex.test(key))
  .map((key) => key.split("_")[0].toLowerCase());

export const NETWORKS = allChains.filter(
  (chain) =>
    // Check if chain has the same explorer
    !!chain.blockExplorers?.find(({ name }) =>
      availableExplorers.includes(name.toLowerCase())
    )
);

const buildRpcEndpoint = (network: Chain): string => {
  const infuraRpcEndpoints = network.rpcUrls.filter((rpcUrl) =>
    rpcUrl.includes("infura")
  );

  if (infuraRpcEndpoints.length) {
    return `${infuraRpcEndpoints[0]}/${INFURA_PROJECT_ID}`;
  }

  return network.rpcUrls[0];
};

export const getProvider = (networkId: number): providers.Provider => {
  if (STATIC_PROVIDERS_CACHE.has(networkId)) {
    return STATIC_PROVIDERS_CACHE.get(networkId)!;
  }

  const network = NETWORKS.find((n) => n.id === networkId);

  if (!network) {
    throw new Response(`No provider found for given network id ${networkId}`, {
      status: 400,
    });
  }

  const provider = new providers.StaticJsonRpcProvider(
    buildRpcEndpoint(network),
    networkId
  );

  STATIC_PROVIDERS_CACHE.set(networkId, provider);

  return provider;
};
