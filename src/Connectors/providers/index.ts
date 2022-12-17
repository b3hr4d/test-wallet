import type { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import type { getPriorityConnector, Web3ReactHooks } from "@web3-react/core"
import type { MetaMask } from "@web3-react/metamask"
import type { Network } from "@web3-react/network"
import type { Provider, Web3ReactStore } from "@web3-react/types/dist/index"
import type { WalletConnect } from "@web3-react/walletconnect"
import { coinbaseWallet, coinbaseWalletHooks } from "./coinbaseWallet"
import { metaMask, metaMaskHooks } from "./metaMask"
import { hooks, network } from "./network"
import { walletConnect, walletConnectHooks } from "./walletConnect"

export type Connectors = [
  MetaMask | WalletConnect | CoinbaseWallet | Network,
  Web3ReactHooks
][]

export type Priority = ReturnType<typeof getPriorityConnector>

export type WalletState = {
  store: Web3ReactStore
  hooks: Web3ReactHooks
  network: Network
  provider?: Provider
}

export const MetaMaskConnector: [MetaMask, Web3ReactHooks] = [
  metaMask,
  metaMaskHooks,
]

export const WalletConnector: [WalletConnect, Web3ReactHooks] = [
  walletConnect,
  walletConnectHooks,
]

export const CoinBaseConnector: [CoinbaseWallet, Web3ReactHooks] = [
  coinbaseWallet,
  coinbaseWalletHooks,
]

export const NetworkConnector: [Network, Web3ReactHooks] = [network, hooks]

const connectors: Connectors = [
  MetaMaskConnector,
  WalletConnector,
  CoinBaseConnector,
  NetworkConnector,
]

export * from "./coinbaseWallet"
export * from "./metaMask"
export * from "./network"
export * from "./walletConnect"

export default connectors
