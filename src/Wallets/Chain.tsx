import type { Web3ReactHooks } from "@web3-react/core"
import { CHAINS } from "../Connectors/providers/chains"

export function Chain({
  chainId,
}: {
  chainId: ReturnType<Web3ReactHooks["useChainId"]>
}) {
  if (chainId === undefined) return null

  const name = chainId ? CHAINS[chainId]?.name : undefined

  return (
    <div>
      {name ? (
        <p>
          Chain:&nbsp;
          <b>
            {name} ({chainId})
          </b>
        </p>
      ) : (
        <p>
          Chain Id:&nbsp;
          <b>{chainId}</b>
        </p>
      )}
    </div>
  )
}
