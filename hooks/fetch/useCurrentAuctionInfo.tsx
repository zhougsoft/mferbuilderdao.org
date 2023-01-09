import { AuctionInfo } from 'services/auction'
import useSWR from 'swr'

export const useCurrentAuctionInfo = ({
  auctionContract,
}: {
  auctionContract?: string
}) => {
  return useSWR<AuctionInfo>(
    auctionContract ? `/api/auction/${auctionContract}` : undefined
  )
}
