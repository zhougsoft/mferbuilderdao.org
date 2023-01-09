import { TokenInfo } from 'services/token'
import { TOKEN_CONTRACT } from 'constants/addresses'
import useSWR from 'swr'

export const useTokenInfo = ({ tokenId }: { tokenId?: string }) => {
  return useSWR<TokenInfo>(
    tokenId ? `/api/token/${TOKEN_CONTRACT}/${tokenId}` : undefined
  )
}
