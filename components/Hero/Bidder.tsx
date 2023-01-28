import { BigNumber } from 'ethers'
import { useEnsName } from 'wagmi'
import { shortenAddress } from '@/utils/shortenAddress'
import { formatTreasuryBalance } from '@/utils/formatTreasuryBalance'
import UserAvatar from '../UserAvatar'

export const Bidder = ({
  address,
  amount,
}: {
  address?: `0x${string}`
  amount: string
}) => {
  const { data: ensName } = useEnsName({ address })

  if (!address) return <></>

  return (
    <div className="flex items-center justify-between w-full mt-6 sm:border-b border-skin-stroke pb-4">
      <div className="text-skin-muted">
        {formatTreasuryBalance(BigNumber.from(amount)) || 'N/A'}
      </div>

      <div className="flex items-center">
        <div className="flex items-center mt-2">
          <UserAvatar className="h-6 rounded-full mr-2" address={address} />
          <div className="font-semibold text-skin-base">
            {ensName || shortenAddress(address)}
          </div>
        </div>
      </div>
    </div>
  )
}
