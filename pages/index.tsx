import type { GetStaticPropsResult } from 'next'
import { SWRConfig } from 'swr'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { promises as fs } from 'fs'
import path from 'path'

import {
  ContractInfo,
  getContractInfo,
  getTokenInfo,
  TokenInfo,
} from 'services/token'
import { AuctionInfo, getCurrentAuction } from 'services/auction'
import { getAddresses } from '@/services/manager'
import { useIsMounted } from 'hooks/useIsMounted'

import Hero from '@/components/Hero/Hero'
import FaqElement from '@/components/FaqElement'

// TODO: abstract Header/Footer into Layout wrapper
import Layout from '@/components/Layout'
import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'

// TODO: this is duped elsewhere
type MarkdownSource = MDXRemoteSerializeResult<Record<string, unknown>>

interface HomePageProps {
  tokenContract: string
  tokenId: string
  contract: ContractInfo
  token: TokenInfo
  auction: AuctionInfo
  descriptionSource: MarkdownSource
  faqSources: MarkdownSource[]
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomePageProps>
> {
  // Get token and auction info
  const tokenContract = process.env.NEXT_PUBLIC_TOKEN_CONTRACT! as `0x${string}`
  const addresses = await getAddresses({ tokenAddress: tokenContract })

  const [contract, auction] = await Promise.all([
    getContractInfo({ address: tokenContract }),
    getCurrentAuction({ address: addresses.auction }),
  ])

  const tokenId = auction.tokenId
  const token = await getTokenInfo({
    address: tokenContract,
    tokenid: tokenId,
  })

  // Get description and faq markdown
  const templateDirectory = path.join(process.cwd(), 'templates')
  const descFile = await fs.readFile(
    templateDirectory + '/home/description.md',
    'utf8'
  )
  const descMD = await serialize(descFile, {
    mdxOptions: { remarkPlugins: [], rehypePlugins: [], development: false },
  })

  let faqSources: MarkdownSource[] = []
  try {
    const faqFiles = await fs.readdir(templateDirectory + '/home/faq', {
      withFileTypes: true,
    })

    faqSources = await Promise.all(
      faqFiles
        .filter(dirent => dirent.isFile())
        .map(async file => {
          const faqFile = await fs.readFile(
            templateDirectory + '/home/faq/' + file.name,
            'utf8'
          )

          return serialize(faqFile, { parseFrontmatter: true })
        })
    ).then(x =>
      x.sort(
        (a, b) =>
          Number(a.frontmatter?.order || 0) - Number(b.frontmatter?.order || 0)
      )
    )
  } catch {
    // no FAQ directory, do nothing
  }

  if (!contract.image) contract.image = ''

  return {
    props: {
      tokenContract,
      tokenId,
      contract,
      token,
      auction,
      descriptionSource: descMD,
      faqSources,
    },
    revalidate: 60,
  }
}

export default function HomePage({
  tokenContract,
  tokenId,
  contract,
  token,
  auction,
  descriptionSource,
  faqSources,
}: HomePageProps) {
  const isMounted = useIsMounted()

  if (!isMounted) return <></>


  // TODO: wrap this page in the Layout component, modify so Hero displays 100% across the screen

  return (
    <SWRConfig
      value={{
        fallback: {
          [`/api/token/${tokenContract}`]: contract,
          [`/api/token/${tokenContract}/${tokenId}`]: token,
          [`/api/auction/${contract.auction}`]: auction,
        },
      }}>
      <div className="bg-skin-backdrop text-skin-base min-h-screen flex flex-col items-center justify-around">
        <div className="bg-skin-fill w-full flex items-center justify-around">
          <div className="max-w-[1400px]">
            <Header />
            <Hero />
          </div>
        </div>
        <div className="max-w-[1400px] w-full">
          <div>
            <div className="bg-skin-backdrop lg:px-24 xl:px-52 mt-8">
              <div className="h-full w-full wrapper focus:outline-none pt-12 p-6 break-words prose prose-skin prose-headings:font-heading lg:prose-xl max-w-none">
                <MDXRemote {...descriptionSource} />
              </div>

              <div className="pt-12 p-8 ">
                {faqSources.map((x, i) => (
                  <div key={i} className="mb-10">
                    <FaqElement
                      className={
                        'flex items-center font-semibold justify-between w-full text-left text-4xl font-heading text-skin-base hover:text-skin-highlighted'
                      }
                      title={x.frontmatter?.title || ''}>
                      <div className="prose prose-skin prose-headings:font-heading break-words max-w-none mt-8">
                        <MDXRemote {...x} />
                      </div>
                    </FaqElement>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </SWRConfig>
  )
}
