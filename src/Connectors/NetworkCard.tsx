import { useEffect, useState } from "react"
import WalletCard from "../Wallets/WalletCard"
import { hooks, network } from "./providers/network"

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks

export default function NetworkCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()

  const [error, setError] = useState<Error>()
  // attempt to connect eagerly on mount
  useEffect(() => {
    void network.activate().catch(() => {
      console.debug("Failed to connect to network")
    })
  }, [])

  return (
    <WalletCard
      connector={network}
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
