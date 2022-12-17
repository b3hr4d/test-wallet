import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core"
import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import { WalletConnect } from "@web3-react/walletconnect"
import ConnectWallet from "."
import {
  coinbaseWallet,
  coinbaseWalletHooks,
  hooks,
  metaMask,
  metaMaskHooks,
  network,
  walletConnect,
  walletConnectHooks,
} from "../Connectors/providers"
import { CHAIN } from "../Connectors/providers/chains"
import { getName } from "./WalletCard"

const connectors: [
  MetaMask | WalletConnect | CoinbaseWallet | Network,
  Web3ReactHooks
][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
  [network, hooks],
]

function Child() {
  const { connector, provider, account, chainId, isActivating, isActive } =
    useWeb3React()

  console.log(`Account is: ${account}`)
  console.log(`Priority Connector is: ${getName(connector)}`)
  console.log(provider?.getSigner())

  const changeChain = async () => {
    if (provider) {
      try {
        await connector.provider?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${CHAIN.toString(16)}` }],
        })
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask.
        console.log(error)
      }
    }
  }

  const signatureRequest = async () => {
    if (provider) {
      const signer = provider.getSigner()
      const message = "Hello World"
      const signature = await signer.signMessage(message)
      console.log(signature)
    }
  }

  return (
    <div>
      <h5>Priority Connector: {getName(connector)}</h5>
      <div>ChainId: {chainId}</div>
      {chainId !== CHAIN ? (
        <button onClick={changeChain}>Change Chain</button>
      ) : (
        <div>
          <div>Account: {account}</div>
          <button onClick={signatureRequest}>Sign Message</button>
        </div>
      )}

      <div>isActivating: {isActivating ? "true" : "false"}</div>
      <div>isActive: {isActive ? "true" : "false"}</div>
      <br />
      <ConnectWallet />
    </div>
  )
}

export default function ProviderExample() {
  return (
    <Web3ReactProvider connectors={connectors} lookupENS={false}>
      <Child />
    </Web3ReactProvider>
  )
}
