import { BuilderSDK } from '@buildersdk/sdk'
import DefaultProvider from '@/utils/DefaultProvider'

export type Bid = {
  tokenId: number
  bidder: `0x${string}`
  amount: string
  extended: boolean
}

export type AuctionInfo = {
  tokenId: number
  highestBid: string
  highestBidder: `0x${string}`
  startTime: number
  endTime: number
  settled: boolean
  bids: Bid[]
}

export type PreviousAuction = {
  tokenId: number
  winner: `0x${string}`
  amount: string
}

const { auction } = BuilderSDK.connect({ signerOrProvider: DefaultProvider })

export const getCurrentAuction = async ({
  address,
}: {
  address: `0x${string}`
}) => {
  const { tokenId, highestBid, highestBidder, startTime, endTime, settled } =
    await auction({
      address,
    }).auction()

  const bids = await getAuctionBids({ address, tokenId: tokenId.toNumber() })

  return {
    tokenId: tokenId.toNumber(),
    highestBid: highestBid.toString(),
    highestBidder,
    startTime,
    endTime,
    settled,
    bids,
  } as AuctionInfo
}

export const getPreviousAuctions = async ({
  address,
}: {
  address: `0x${string}`
}) => {
  const auctionContract = auction({ address })
  const filter = auctionContract.filters.AuctionSettled(null, null, null)
  const events = await auctionContract.queryFilter(filter)
  return events.map(
    x =>
      ({
        tokenId: x.args?.tokenId.toNumber(),
        winner: x.args?.winner,
        amount: x.args?.amount.toString(),
      } as PreviousAuction)
  )
}

export const getAuctionBids = async ({
  address,
  tokenId,
}: {
  address: `0x${string}`
  tokenId: number
}) => {
  // query onchain auction bid event:
  // event AuctionBid(uint256 tokenId, address bidder, uint256 amount, bool extended, uint256 endTime);
  const auctionContract = auction({ address })
  const filter = auctionContract.filters.AuctionBid(
    null,
    null,
    null,
    null,
    null
  )
  const events = await auctionContract.queryFilter(filter)

  // sort & parse fetched bids for requested tokenId
  const bids = events.reduce((acc, event) => {
    const bidTokenId = event.args ? event.args[0] : null

    if (bidTokenId && bidTokenId.toNumber() === tokenId) {
      const { bidder, amount, extended } = event.args as any

      acc.push({
        tokenId,
        bidder,
        amount: amount.toString(),
        extended,
      } as Bid)
    }
    return acc
  }, [] as Bid[])

  return bids
}
