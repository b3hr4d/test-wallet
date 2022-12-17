import { URI_AVAILABLE } from "@web3-react/walletconnect"
import { useEffect, useState } from "react"
import WalletCard from "../Wallets/WalletCard"
import { walletConnect, walletConnectHooks } from "./providers/walletConnect"

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  walletConnectHooks

export default function WalletConnectCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()

  const [error, setError] = useState<Error>()
  // log URI when available
  useEffect(() => {
    walletConnect.events.on(URI_AVAILABLE, (uri: string) => {
      console.log(`uri: ${uri}`)
    })
  }, [])

  // attempt to connect eagerly on mount
  useEffect(() => {
    walletConnect.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to walletconnect")
    })
  }, [])

  return (
    <WalletCard
      connector={walletConnect}
      chainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
    />
  )
}
