import { CHAINS, URLS } from "../Connectors/providers/chains"
import useChainSwitch from "../useChainSwitch"

interface ChainChangerProps {}

const ChainChanger: React.FC<ChainChangerProps> = () => {
  const { chainId, isActivating, switchChain } = useChainSwitch()

  const chainIds = Object.keys(URLS)

  return (
    <select
      onChange={(event) => {
        switchChain(Number(event.target.value))
      }}
      value={chainId}
      disabled={isActivating}
    >
      {chainIds.map((chainId: any) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  )
}

export default ChainChanger
