import WhitelistForm from './components/whitelist-form'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col items-center justify-center space-y-8 mb-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
            FiveM Server Whitelist
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Apply to join our exclusive roleplay server. Complete the application below to get started.
          </p>
        </div>
      </div>
      <WhitelistForm />
    </main>
  )
}
