import type { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import type { Web3ReactHooks } from "@web3-react/core"
import type { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import { WalletConnect } from "@web3-react/walletconnect"
import { useCallback } from "react"
import {
  CHAINS,
  getAddChainParameters,
  URLS,
} from "../Connectors/providers/chains"
import useChainSwitch from "../useChainSwitch"
import ChainSelect from "./ChainSelect"

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network
  chainId: ReturnType<Web3ReactHooks["useChainId"]>
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>
  error: Error | undefined
  setError: (error: Error | undefined) => void
}) {
  const isNetwork = connector instanceof Network
  const displayDefault = !isNetwork
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId)
  )
  const { desiredChainId, switchChain } = useChainSwitch()

  const connectHandler = useCallback(() => {
    if (connector instanceof WalletConnect || connector instanceof Network)
      connector
        .activate(desiredChainId === -1 ? undefined : desiredChainId)
        .then(() => setError(undefined))
        .catch(setError)
    else {
      connector
        .activate(
          desiredChainId === -1
            ? undefined
            : getAddChainParameters(desiredChainId)
        )
        .then(() => setError(undefined))
        .catch(setError)
    }
  }, [connector, desiredChainId, setError])

  const disconnectHandler = () => {
    setError(undefined)
    if (connector?.deactivate) {
      void connector.deactivate()
    } else {
      void connector.resetState()
    }
  }

  return (
    <ChainSelect
      title={error ? "Try Again?" : isActive ? "Disconnect" : "Connect"}
      onClick={isActive ? disconnectHandler : connectHandler}
      chainId={desiredChainId}
      loading={isActivating}
      switchChain={switchChain}
      displayDefault={displayDefault}
      chainIds={chainIds}
    />
  )
}
