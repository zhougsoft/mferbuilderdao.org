// redirect to the mferbuilderDAO cookbook

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination:
        'https://zhoug.notion.site/mferbuilderDAO-e3a2f004107c4b6ab87dc84e07db9725',
    },
    props: {},
  }
}

export default () => {}
