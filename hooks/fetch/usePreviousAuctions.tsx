import useSWR from 'swr'
import { PreviousAuction } from '@/services/auction'

export const usePreviousAuctions = ({
  auctionContract,
}: {
  auctionContract?: string
}) => {
  return useSWR<PreviousAuction[]>(`/api/auction/${auctionContract}/previous`)
}
