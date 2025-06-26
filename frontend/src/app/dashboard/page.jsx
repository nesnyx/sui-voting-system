"use client"

import { useState, useEffect } from 'react'
import { 
  Wallet, 
  Users, 
  Clock, 
  TrendingUp, 
  Settings,
  LogOut,
  ChevronDown,
  User,
  CheckCircle,
  ArrowRight,
  Copy,
  ExternalLink,
  BarChart3,
  Activity
} from 'lucide-react'

export default function Dashboard() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [selectedPoll, setSelectedPoll] = useState(null)
  const [votingOption, setVotingOption] = useState('')

  // Mock data
  const [stats, setStats] = useState({
    totalVotes: 0,
    activePolls: 0,
    participation: 0
  })

  const polls = [
    {
      id: 1,
      title: "Protocol Upgrade v2.0",
      description: "Should we implement the new consensus mechanism for faster transactions?",
      endTime: "2024-01-15T18:00:00Z",
      participants: 1247,
      options: [
        { name: "Yes", votes: 1876, percentage: 80.1 },
        { name: "No", votes: 465, percentage: 19.9 }
      ],
      status: "active"
    },
    {
      id: 2,
      title: "Treasury Allocation Q1",
      description: "How should we allocate 100K USDC from treasury?",
      endTime: "2024-01-20T12:00:00Z",
      participants: 892,
      options: [
        { name: "Development", votes: 583, percentage: 40.0 },
        { name: "Marketing", votes: 437, percentage: 30.0 },
        { name: "Security", votes: 436, percentage: 30.0 }
      ],
      status: "active"
    }
  ]

  const activities = [
    { id: 1, action: "Voted on Protocol Upgrade", time: "2 min ago", type: "vote" },
    { id: 2, action: "New poll created", time: "15 min ago", type: "create" },
    { id: 3, action: "Poll ended: DeFi Integration", time: "1 hour ago", type: "end" }
  ]

  // Animate stats on mount
  useEffect(() => {
    if (isWalletConnected) {
      const timer = setTimeout(() => {
        setStats({
          totalVotes: 12847,
          activePolls: 24,
          participation: 78.5
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isWalletConnected])

  const handleWalletConnect = () => {
    const mockAddress = '0x742d35Cc6633C0532925a3b8D47d6a03bc4f12e7'
    setIsWalletConnected(true)
    setUserAddress(mockAddress)
  }

  const handleVote = () => {
    if (!votingOption || !selectedPoll) return

    // Simulate voting
    alert(`Vote submitted: ${votingOption} for "${selectedPoll.title}"`)
    setSelectedPoll(null)
    setVotingOption('')
  }

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getTimeRemaining = (endTime) => {
    const now = new Date()
    const end = new Date(endTime)
    const diff = end - now
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    return `${days}d ${hours}h left`
  }

  // Wallet Connection Screen
  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">A</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">Connect Wallet</h1>
          <p className="text-gray-300 mb-8">Connect your wallet to start voting</p>

          <div className="space-y-4">
            <button
              onClick={handleWalletConnect}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </button>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Trustless</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-white font-bold text-xl">voting</span>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-white text-sm font-medium">
                    {truncateAddress(userAddress)}
                  </div>
                  <div className="text-gray-400 text-xs">Connected</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="text-white font-medium text-sm">Wallet</div>
                    <div className="text-gray-400 text-xs font-mono">{truncateAddress(userAddress)}</div>
                  </div>
                  <button className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                    <Copy className="w-4 h-4 mr-3" />
                    Copy Address
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-3" />
                    View on Explorer
                  </button>
                  <div className="border-t border-white/10 mt-2 pt-2">
                    <button
                      onClick={() => setIsWalletConnected(false)}
                      className="flex items-center w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-cyan-400" />
              <span className="text-green-400 text-sm font-medium">+12.5%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalVotes.toLocaleString()}</div>
            <div className="text-gray-400">Total Votes</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-400" />
              <span className="text-green-400 text-sm font-medium">+3</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.activePolls}</div>
            <div className="text-gray-400">Active Polls</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-green-400 text-sm font-medium">+2.3%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.participation}%</div>
            <div className="text-gray-400">Participation</div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Polls */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Active Polls</h2>

            <div className="space-y-4">
              {polls.map((poll) => (
                <div
                  key={poll.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedPoll(poll)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2">{poll.title}</h3>
                      <p className="text-gray-300 text-sm mb-3">{poll.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Poll Options */}
                  <div className="space-y-2 mb-4">
                    {poll.options.map((option, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm font-medium">{option.name}</span>
                          <span className="text-gray-400 text-sm">{option.percentage}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${option.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{poll.participants} participants</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{getTimeRemaining(poll.endTime)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button className="w-full text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Voting Modal */}
      {selectedPoll && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">{selectedPoll.title}</h3>
            <p className="text-gray-300 mb-6">{selectedPoll.description}</p>

            <div className="space-y-3 mb-6">
              {selectedPoll.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    name="vote"
                    value={option.name}
                    checked={votingOption === option.name}
                    onChange={(e) => setVotingOption(e.target.value)}
                    className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 focus:ring-cyan-500"
                  />
                  <span className="text-white font-medium">{option.name}</span>
                  <span className="text-gray-400 text-sm ml-auto">{option.percentage}%</span>
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedPoll(null)}
                className="flex-1 px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleVote}
                disabled={!votingOption}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
              >
                Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
