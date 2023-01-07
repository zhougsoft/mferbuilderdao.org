import { NextApiRequest, NextApiResponse } from 'next'
import { getProposalVotes } from '@/services/governor'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, proposalId } = req.query

  const votes = await getProposalVotes({
    address: address as `0x${string}`,
    proposalId: proposalId as string,
  })

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24
  res.setHeader(
    'Cache-Control',
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  )
  res.send(votes)
}

export default handler
