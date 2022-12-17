import { formatEther } from "@ethersproject/units"
import type { Web3ReactHooks } from "@web3-react/core"
import useBalances from "../useBalances"

interface AccountsProps {
  accounts: ReturnType<Web3ReactHooks["useAccounts"]>
  provider: ReturnType<Web3ReactHooks["useProvider"]>
}

export const Accounts: React.FC<AccountsProps> = ({ accounts, provider }) => {
  const balances = useBalances(provider, accounts)

  if (accounts === undefined) return null

  return (
    <div className="d-flex">
      <p>Accounts:&nbsp;</p>
      <ul>
        {accounts.length === 0
          ? "None"
          : accounts?.map((account, i) => (
              <li key={account}>
                {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
              </li>
            ))}
      </ul>
    </div>
  )
}
