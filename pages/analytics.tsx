import type { GetStaticPropsResult } from 'next'
import { SWRConfig } from 'swr'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { promises as fs } from 'fs'
import path from 'path'

import { useIsMounted } from 'hooks/useIsMounted'

import GovernanceAnalytics from '@/components/AnalyticsGovernance'
import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'
type MarkdownSource = MDXRemoteSerializeResult<Record<string, unknown>>

interface AnalyticsPageProps {    
  descriptionSource: MarkdownSource
}
export async function getStaticProps(): Promise<
  GetStaticPropsResult<AnalyticsPageProps>
> {
  // Get description and faq markdown
  const templateDirectory = path.join(process.cwd(), 'templates')

  const analyticsFile = await fs.readFile(
    templateDirectory + '/analytics.md',
    'utf8'
  )
  const analyticsMD = await serialize(analyticsFile, {
    mdxOptions: { remarkPlugins: [], rehypePlugins: [], development: false },
  })


  return {
    props: {
      descriptionSource: analyticsMD,
    },
    revalidate: 60,
  }
}

export default function AnalyticsPage({
  descriptionSource,
}: AnalyticsPageProps) {
  const isMounted = useIsMounted()

  if (!isMounted) return <></>

  // TODO: wrap this page in the Layout component, modify so Hero displays 100% across the screen

  return (
    <SWRConfig>
      <div className="bg-skin-backdrop text-skin-base min-h-screen flex flex-col items-center">
        <div className="bg-skin-fill w-full flex items-center justify-around">
          <div className="max-w-[1400px]">
            <Header />
          </div>
        </div>
        <div className="max-w-[1400px] w-full">
          <GovernanceAnalytics/>
          {/*Holders analytics*/}
          {/*Treasury analytics*/}
          {/*Auctions analytics*/}
          <Footer />
        </div>
      </div>
    </SWRConfig>
  )
}
