export default function HoldersAnalytics() {
  return (
    <div>
      <div className="flex flex-col items-center space-y-12">
        <div className="text-2xl font-bold">Holders</div>
        <iframe
          src="https://dune.com/embeds/1907602/3141004/26cd06a0-541c-411f-a07f-32cdfeb04de3"
          className="w-98 h-96 md:w-110"
          title="[name-of-your-query]"></iframe>
        <div className="flex flex-col md:flex-row items-center space-x-10">
          <div className="flex flex-col space-y-12">
            <iframe
              src="https://dune.com/embeds/1907641/3141091/8bbced55-704d-4e25-b54f-5640942ad8f2"
              className="w-96 h-48"
              title="[name-of-your-query]"></iframe>
            <iframe
              src="https://dune.com/embeds/1907641/3141092/3ea73b45-844f-4e9b-9ec1-cb8fd4505068"
              className="w-96 h-48"
              title="[name-of-your-query]"></iframe>
          </div>
          <iframe
            src="https://dune.com/embeds/1872422/3081682/05cce569-91e0-4003-8e59-e87e03f20753"
            height="500"
            width="500"
            title="[name-of-your-query]"></iframe>
        </div>
      </div>
    </div>
  )
}
