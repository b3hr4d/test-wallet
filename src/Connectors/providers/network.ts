import { initializeConnector } from "@web3-react/core"
import { Network } from "@web3-react/network"
import { CHAIN, URLS } from "./chains"

export const [network, hooks, store] = initializeConnector<Network>(
  (actions) => new Network({ actions, urlMap: URLS, defaultChainId: CHAIN })
)
