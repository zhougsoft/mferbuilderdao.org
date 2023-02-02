export default function HoldersAnalytics() {
  return (
    <div>
      <div className="flex flex-col items-center space-y-12">
        <div className="text-2xl font-bold">Holders</div>
        <iframe
          src="https://dune.com/embeds/1907602/3141004/26cd06a0-541c-411f-a07f-32cdfeb04de3"
          className="w-94 h-96 md:w-110"
          title="Holders Table"></iframe>
        <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
          <div className="flex flex-col space-y-12">
            <iframe
              src="https://dune.com/embeds/1907641/3141091/8bbced55-704d-4e25-b54f-5640942ad8f2"
              className="w-94 h-48"
              title="Unique Holder Count"></iframe>
            <iframe
              src="https://dune.com/embeds/1907641/3141092/3ea73b45-844f-4e9b-9ec1-cb8fd4505068"
              className="w-94 h-48"
              title="Unique Holder Percentage"></iframe>
          </div>
          <iframe
            src="https://dune.com/embeds/1872422/3081682/05cce569-91e0-4003-8e59-e87e03f20753"
            className="w-94 h-96 md:w-110"
            title="Holder Distribution"></iframe>
        </div>
      </div>
    </div>
  )
}
