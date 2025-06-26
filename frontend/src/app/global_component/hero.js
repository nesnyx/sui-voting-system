

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          <span className="text-sm text-gray-300">Now Live on Mainnet</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Trustless
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Voting </span>
          System
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join in the decentralized ecosystem Sui. Voting with Trustless System is easy and secure. No need to trust any third party
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:-translate-y-1">
            Launch dApp
          </button>
          <button className="border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
            Learn More
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/10">
          {/* <div className="text-center">
            <div className="text-2xl font-bold text-white">$2.1B+</div>
            <div className="text-gray-400">Total Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">150K+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
