import { BuilderSDK } from '@buildersdk/sdk'
import DefaultProvider from '@/utils/DefaultProvider'

const { governor } = BuilderSDK.connect({ signerOrProvider: DefaultProvider })

export type Vote = {
  voter: `0x${string}`
  proposalId: `0x${string}`
  support: number
  weight: number
  reason: string
}

export type Proposal = {
  proposalId: `0x${string}`
  targets: `0x${string}`[]
  values: number[]
  calldatas: `0x${string}`[]
  description: string
  descriptionHash: `0x${string}`
  proposal: ProposalDetails
  state: number
}

export type ProposalDetails = {
  proposer: `0x${string}`
  timeCreated: number
  againstVotes: number
  forVotes: number
  abstainVotes: number
  voteStart: number
  voteEnd: number
  proposalThreshold: number
  quorumVotes: number
  executed: boolean
  canceled: boolean
  vetoed: boolean
}

export const getProposalState = async ({
  address,
  proposalId,
}: {
  address: `0x${string}`
  proposalId: `0x${string}`
}) => {
  return governor({ address }).state(proposalId)
}

export const getProposalDetails = async ({
  address,
  proposalId,
}: {
  address: `0x${string}`
  proposalId: `0x${string}`
}): Promise<ProposalDetails> => {
  const {
    proposer,
    timeCreated,
    againstVotes,
    forVotes,
    abstainVotes,
    voteStart,
    voteEnd,
    proposalThreshold,
    quorumVotes,
    executed,
    canceled,
    vetoed,
  } = await governor({ address }).getProposal(proposalId)

  return {
    proposer,
    timeCreated,
    againstVotes,
    forVotes,
    abstainVotes,
    voteStart,
    voteEnd,
    proposalThreshold,
    quorumVotes,
    executed,
    canceled,
    vetoed,
  }
}

export const getProposals = async ({ address }: { address: `0x${string}` }) => {
  const governorContract = governor({ address })
  const filter = governorContract.filters.ProposalCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    null
  )

  const events = await governorContract.queryFilter(filter)
  const proposalResponse = await Promise.all(
    events.map(async event => {
      const { proposalId, targets, calldatas, description, descriptionHash } =
        event.args as any

      const [proposal, state] = await Promise.all([
        getProposalDetails({ address, proposalId }),
        getProposalState({ address, proposalId }),
      ])

      // Get from array because of ethers naming collision
      const values = (event.args as any)[2]

      return {
        proposalId,
        targets,
        values,
        calldatas,
        description,
        descriptionHash,
        proposal,
        state,
      } as Proposal
    })
  )

  return proposalResponse.sort(
    (a, b) => b.proposal.timeCreated - a.proposal.timeCreated
  )
}

export const getProposalVotes = async ({
  address,
  proposalId,
}: {
  address: `0x${string}`
  proposalId: string
}) => {
  // query the onchain VoteCast event:
  // event VoteCast(address voter, bytes32 proposalId, uint256 support, uint256 weight, string reason)
  const governorContract = governor({ address })
  const filter = governorContract.filters.VoteCast(null, null, null, null, null)
  const events = await governorContract.queryFilter(filter)

  // get votes that were cast for the given proposal id
  const votes = events.reduce((acc, event) => {
    const voteProposalId = event.args ? event.args[1] : null

    if (voteProposalId && voteProposalId === proposalId) {
      const { voter, support, weight, reason } = event.args as any

      acc.push({
        voter,
        proposalId: voteProposalId,
        support: support.toNumber(),
        weight: weight.toNumber(),
        reason,
      } as Vote)
    }
    return acc
  }, [] as Vote[])

  return votes
}
