// redirect to the mferbuilderDAO auction page

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination:
        'https://nouns.build/dao/0x795D300855069F602862c5e23814Bdeeb25DCa6b',
    },
    props: {},
  }
}

export default () => {}
