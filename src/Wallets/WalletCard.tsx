import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import { Web3ReactHooks } from "@web3-react/core"
import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import type { Connector } from "@web3-react/types"
import { WalletConnect } from "@web3-react/walletconnect"
import { Accounts } from "./Accounts"
import { Chain } from "./Chain"
import { ConnectWithSelect } from "./ConnectWithSelect"
import { Status } from "./Status"

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask"
  if (connector instanceof WalletConnect) return "WalletConnect"
  if (connector instanceof CoinbaseWallet) return "Coinbase Wallet"
  if (connector instanceof Network) return "Network"
  return "Unknown"
}

interface WalletCardProps {
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network
  chainId: ReturnType<Web3ReactHooks["useChainId"]>
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>
  error?: Error
  setError: (error?: Error) => void
  provider?: ReturnType<Web3ReactHooks["useProvider"]>
  accounts?: string[]
}

const WalletCard: React.FC<WalletCardProps> = ({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
  accounts,
  provider,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        padding: "1rem",
        margin: "1rem",
      }}
    >
      connector:{getName(connector)}
      <div>
        <div>
          <Status
            isActivating={isActivating}
            isActive={isActive}
            error={error}
          />
          <Chain chainId={chainId} />
          <Accounts accounts={accounts} provider={provider} />
        </div>
        <div>
          <ConnectWithSelect
            connector={connector}
            chainId={chainId}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            setError={setError}
          />
        </div>
      </div>
    </div>
  )
}

export default WalletCard
