import { useEffect, useState } from "react"
import WalletCard from "../Wallets/WalletCard"
import { metaMask, metaMaskHooks } from "./providers/metaMask"

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  metaMaskHooks

export default function MetaMaskCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()

  const [error, setError] = useState<Error>()
  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask")
    })
  }, [])

  return (
    <WalletCard
      connector={metaMask}
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
