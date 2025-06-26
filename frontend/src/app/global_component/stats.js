'use client'
import { useState, useEffect } from 'react'

export default function Stats() {
  const [counters, setCounters] = useState({
    tvl: 0,
    transactions: 0,
    users: 0,
    protocols: 0
  })

  // Animasi counter
  useEffect(() => {
    const targets = {
      tvl: 2100000000, // $2.1B
      transactions: 45000000, // 45M
      users: 250000, // 250K
      protocols: 150 // 150
    }

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepTime = duration / steps

    Object.keys(targets).forEach(key => {
      let current = 0
      const increment = targets[key] / steps

      const timer = setInterval(() => {
        current += increment
        if (current >= targets[key]) {
          current = targets[key]
          clearInterval(timer)
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, stepTime)
    })
  }, [])

  const formatNumber = (num) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
    return num.toString()
  }

  return (
    <section className="py-20 px-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Platform Statistics
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join a thriving ecosystem of DeFi protocols and active community members building the future of finance.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Value Locked */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-purple-600/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 text-center hover:border-cyan-500/40 transition-all">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 mb-2">
              {formatNumber(counters.tvl)}
            </div>
            <div className="text-gray-400 font-medium">Total Value Locked</div>
          </div>

          {/* Total Transactions */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center hover:border-purple-500/40 transition-all">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300 mb-2">
              {formatNumber(counters.transactions)}
            </div>
            <div className="text-gray-400 font-medium">Transactions</div>
          </div>

          {/* Total Users */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 text-center hover:border-green-500/40 transition-all">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300 mb-2">
              {formatNumber(counters.users)}
            </div>
            <div className="text-gray-400 font-medium">Active Users</div>
          </div>

          {/* Supported Protocols */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 text-center hover:border-orange-500/40 transition-all">
            <div className="text-4xl mb-2">🔗</div>
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300 mb-2">
              {counters.protocols}+
            </div>
            <div className="text-gray-400 font-medium">Protocols</div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="mt-16 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Live Activity
          </h3>
          <div className="space-y-3">
            {[
              { action: "Swap", amount: "$1,234", token: "ETH → USDC", time: "2s ago" },
              { action: "Stake", amount: "$5,678", token: "MATIC", time: "8s ago" },
              { action: "Add Liquidity", amount: "$2,345", token: "UNI/ETH", time: "12s ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-white font-medium">{activity.action}</span>
                  <span className="text-cyan-400">{activity.amount}</span>
                  <span className="text-gray-400">{activity.token}</span>
                </div>
                <span className="text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
