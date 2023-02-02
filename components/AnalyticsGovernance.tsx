export default function GovernanceAnalytics() {
    return (
      <div>
        <div className="flex flex-col items-center space-y-12">
          <div className="text-2xl font-bold">Governance</div>
          <div className="md:flex flex-col items-center md:flex-row lg:space-x-10">
            <iframe
              className="w-94 h-48"
              src="https://dune.com/embeds/1885685/3101539/24b3b0f0-b31c-4874-a1b6-0d078d8947e6"
              title="[name-of-your-query]"></iframe>
            <iframe
              className="w-94 h-48"
              src="https://dune.com/embeds/1885690/3120523/98129cf5-11df-4598-a52a-552685bb68c9"
              title="[name-of-your-query]"></iframe>
          </div>
          <iframe
            src="https://dune.com/embeds/1899150/3126333/45f836f2-fffd-44f2-8fc6-ab1bdd16bcaa"
            className="w-94 h-96 md:w-110"
            title="[name-of-your-query]"></iframe>
          <iframe
            src="https://dune.com/embeds/1906170/3138320/1d9492f9-c26e-4551-a130-425f85f7aa40"
            className="w-94 h-96 md:w-110"
            title="[name-of-your-query]"></iframe>
          <iframe
            src="https://dune.com/embeds/1906285/3138525/85e69f6c-a106-475a-90b5-8803af4dd69c"
            className="w-94 h-96 md:w-110"
            title="[name-of-your-query]"></iframe>
          <iframe
            src="https://dune.com/embeds/1872422/3081682/05cce569-91e0-4003-8e59-e87e03f20753"
            className="w-94 h-96 md:w-110"
            title="[name-of-your-query]"></iframe>
        </div>
      </div>
    )
}