import type { GetStaticPropsResult } from 'next'
import { SWRConfig } from 'swr'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { promises as fs } from 'fs'
import path from 'path'

import { useIsMounted } from 'hooks/useIsMounted'

<<<<<<< HEAD
import Hero from '@/components/Hero/Hero'
import FaqElement from '@/components/FaqElement'

// TODO: abstract Header/Footer into Layout wrapper
import Layout from '@/components/Layout'
=======
import GovernanceAnalytics from '@/components/AnalyticsGovernance'
>>>>>>> dev
import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'
type MarkdownSource = MDXRemoteSerializeResult<Record<string, unknown>>

<<<<<<< HEAD
interface AnlayticsPageProps {    
  descriptionSource: MarkdownSource
  faqSources: MarkdownSource[]
}
export async function getStaticProps(): Promise<
  GetStaticPropsResult<AnlayticsPageProps>
> {
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

  return {
    props: {
      descriptionSource: descMD,
      faqSources,
=======
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
>>>>>>> dev
    },
    revalidate: 60,
  }
}

<<<<<<< HEAD
export default function HomePage({
  descriptionSource,
  faqSources,
}: AnlayticsPageProps) {
=======
export default function AnalyticsPage({
  descriptionSource,
}: AnalyticsPageProps) {
>>>>>>> dev
  const isMounted = useIsMounted()

  if (!isMounted) return <></>

  // TODO: wrap this page in the Layout component, modify so Hero displays 100% across the screen

  return (
    <SWRConfig>
<<<<<<< HEAD
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
=======
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
>>>>>>> dev
          <Footer />
        </div>
      </div>
    </SWRConfig>
  )
}
