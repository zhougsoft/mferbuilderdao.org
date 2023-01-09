import { ContractInfo } from 'services/token'
import { TOKEN_CONTRACT } from 'constants/addresses'
import useSWR from 'swr'

export const useContractInfo = () => {
  return useSWR<ContractInfo>(`/api/token/${TOKEN_CONTRACT}`)
}
