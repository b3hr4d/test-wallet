import { useEffect, useState } from "react"
import WalletCard from "../Wallets/WalletCard"
import { coinbaseWallet, coinbaseWalletHooks } from "./providers/coinbaseWallet"

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  coinbaseWalletHooks

export default function CoinbaseWalletCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()

  const [error, setError] = useState<Error>()
  // attempt to connect eagerly on mount
  useEffect(() => {
    void coinbaseWallet.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to coinbase wallet")
    })
  }, [])

  return (
    <WalletCard
      connector={coinbaseWallet}
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
