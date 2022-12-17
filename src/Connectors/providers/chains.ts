import type { AddEthereumChainParameter } from "@web3-react/types"

export const CHAIN = 56

const BNB: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Binance",
  symbol: "BNB",
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"]
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"]
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else {
    return chainId
  }
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation
} = {
  // BinanceSmartChain
  56: {
    urls: [
      "https://orbital-dawn-bridge.bsc.discover.quiknode.pro/faa1c28492bee5dcd53cc03f05139cfdf6cd65c4/",
      "https://bsc-dataseed.binance.org/",
    ],
    name: "SmartChain",
    nativeCurrency: BNB,
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  97: {
    urls: [
      "https://damp-solemn-lambo.bsc-testnet.discover.quiknode.pro/c0b5ce67fac60125d94f8aa41270acc49e481d5c/",
      "https://data-seed-prebsc-1-s1.binance.org:8545/",
    ],
    name: "SmartChain TestNet",
    nativeCurrency: BNB,
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
}

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  console.log(chainId)
  const validURLs: string[] = CHAINS[Number(chainId)].urls

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs
  }

  return accumulator
}, {})
