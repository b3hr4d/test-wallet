import CoinbaseWalletCard from "../Connectors/CoinbaseWalletCard"
import MetaMaskCard from "../Connectors/MetaMaskCard"
import NetworkCard from "../Connectors/NetworkCard"
import WalletConnectCard from "../Connectors/WalletConnectCard"

interface ConnectWalletProps {}

const ConnectWallet: React.FC<ConnectWalletProps> = () => {
  return (
    <div>
      <MetaMaskCard />
      <WalletConnectCard />
      <CoinbaseWalletCard />
      <NetworkCard />
    </div>
  )
}

export default ConnectWallet
