export default function TreasuryAnalytics() {
  return (
    <div>
      <div className="flex flex-col items-center space-y-12">
        <div className="text-2xl font-bold">Treasury</div>
        <iframe
          src="https://dune.com/embeds/1908003/3141671/85f5c4c9-a8e5-4931-8aa3-1ecc270d9752"
          className="w-94 h-48"
          title="Treasury Value Counter"></iframe>
        <iframe
          src="https://dune.com/embeds/1907993/3141636/f953e6d7-4b50-4d9a-9ede-b2b5dee76f7d"
          className="w-94 h-96 md:w-110"
          title="Treasury Balance Graph"></iframe>
        <iframe
          src="https://dune.com/embeds/1907993/3141638/67716ffc-42e9-43ff-9952-e31e1b7776b5"
          className="w-94 h-96 md:w-110"
          title="Treasury In/Out Graph"></iframe>
      </div>
    </div>
  )
}
