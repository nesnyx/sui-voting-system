"use client"

export default function Features() {
  const features = [
    {
      icon: "🔐",
      title: "Secure & Trustless",
      description: "Built on blockchain technology with smart contract security audits and decentralized infrastructure."
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "High-performance Layer 2 solutions ensuring instant transactions with minimal gas fees."
    },
  ]

  return (
    <section className="py-20 px-6" id="features">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience decentralized voting system with Sui Network for the modern Web3 user.
          </p>
        </div>

        {/* Centered grid untuk 2 items */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 text-center"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
