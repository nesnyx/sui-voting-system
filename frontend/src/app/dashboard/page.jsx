"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/WalletContext'
import { useSuiClientQuery } from '@mysten/dapp-kit'
import { ConnectButton } from '@mysten/dapp-kit'
import CreateProposalModal from '@/components/createProposalModal'
import Link from 'next/link'
import {
  Users,
  Clock,
  TrendingUp,
  ChevronDown,
  User,
  ArrowRight,
  Copy,
  BarChart3,
  Info,
  X,
  Wallet,
  AlertTriangle,
  Loader2,
  Plus,
  Vote
} from 'lucide-react'

const PACKAGE_ID = '0xefaa6e68ed27540f97b89a9b15c48f3e8b7b407ff49efc0f5ac52ca0d268b471'

// Simplified LoadingConnectButton using context data
const LoadingConnectButton = ({ className = "" }) => {
  const { account, isLoading, isInitialized } = useAuth()

  if (!isInitialized || isLoading) {
    return (
      <div className={`flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg ${className}`}>
        <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
        <span className="text-gray-400 text-sm">Checking...</span>
      </div>
    )
  }

  return (
    <ConnectButton
      connectText={
        <div className="flex items-center space-x-2">
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </div>
      }
      className={className}
    />
  )
}

export default function Dashboard() {
  const {
    account,
    isLoading: walletLoading,
    error: walletError,
    walletInfo,
    truncateAddress,
    ownedObjects
  } = useAuth()

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [selectedPoll, setSelectedPoll] = useState(null)
  const [votingOption, setVotingOption] = useState('')
  const [isWalletInfoOpen, setIsWalletInfoOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Query untuk mengambil semua Proposals yang ada
  const {
    data: proposalsData,
    isPending: proposalsLoading,
    error: proposalsError,
    refetch: refetchProposals
  } = useSuiClientQuery(
    'getOwnedObjects',
    {
      owner: account?.address || '',
      filter: {
        StructType: `${PACKAGE_ID}::dashboard::Proposal`
      },
      options: {
        showType: true,
        showContent: true,
        showDisplay: true,
      },
    },
    {
      enabled: !!account?.address,
      retry: 3,
      retryDelay: 1000,
      refetchInterval: 30 * 1000,
    }
  )

  // Transform proposals data
  const proposals = proposalsData?.data?.map(item => {
    const fields = item.data?.content?.fields
    if (!fields) return null

    const now = Math.floor(Date.now() / 1000)
    const isExpired = parseInt(fields.expiration) < now
    const totalVotes = parseInt(fields.voted_yes_count) + parseInt(fields.voted_no_count)

    return {
      id: item.data.objectId,
      title: fields.title,
      description: fields.description,
      endTime: new Date(parseInt(fields.expiration) * 1000).toISOString(),
      creator: fields.creator,
      participants: totalVotes,
      votedYes: parseInt(fields.voted_yes_count),
      votedNo: parseInt(fields.voted_no_count),
      options: [
        {
          name: "Yes",
          votes: parseInt(fields.voted_yes_count),
          percentage: totalVotes > 0 ? ((parseInt(fields.voted_yes_count) / totalVotes) * 100).toFixed(1) : 0
        },
        {
          name: "No",
          votes: parseInt(fields.voted_no_count),
          percentage: totalVotes > 0 ? ((parseInt(fields.voted_no_count) / totalVotes) * 100).toFixed(1) : 0
        }
      ],
      status: isExpired ? "expired" : "active",
      voterRegistry: fields.voter_registry || []
    }
  }).filter(Boolean) || []

  // Stats dari data blockchain
  const [stats, setStats] = useState({
    totalVotes: 0,
    activePolls: 0,
    participation: 0
  })

  useEffect(() => {
    if (proposals.length > 0) {
      const totalVotes = proposals.reduce((sum, p) => sum + p.participants, 0)
      const activePolls = proposals.filter(p => p.status === 'active').length

      setStats({
        totalVotes,
        activePolls,
        participation: 78.5
      })
    }
  }, [proposals])

  const getTimeRemaining = (endTime) => {
    try {
      const now = new Date()
      const end = new Date(endTime)
      const diff = end - now

      if (diff <= 0) return 'Expired'

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      return `${days}d ${hours}h left`
    } catch (err) {
      console.error('Time calculation error:', err)
      return 'Time unavailable'
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Address copied to clipboard!')
    } catch (err) {
      console.error('Copy to clipboard error:', err)
      alert('Failed to copy address')
    }
  }

  const handleCreateSuccess = () => {
    // Refetch proposals after successful creation
    refetchProposals()
  }

  // Loading states
  const isLoading = walletLoading || proposalsLoading

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading dashboard...</p>
          <p className="text-gray-400 text-sm mt-2">Fetching data from Sui blockchain...</p>
        </div>
      </div>
    )
  }

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

            {/* Navigation & User Menu */}
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors text-sm hidden md:block"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition-colors text-sm hidden md:block"
              >
                About
              </Link>

              {/* Create Proposal Button */}
              {account && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden md:inline">Create Proposal</span>
                </button>
              )}

              {/* User Menu */}
              {account ? (
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
                        {truncateAddress(account.address)}
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
                        <div className="text-gray-400 text-xs font-mono">{truncateAddress(account.address)}</div>
                      </div>
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="text-white font-medium text-sm">Balance</div>
                        <div className="text-gray-400 text-xs">{walletInfo.balance}</div>
                      </div>

                      <button
                        onClick={() => {
                          setIsWalletInfoOpen(true)
                          setIsProfileOpen(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Info className="w-4 h-4 mr-3" />
                        Wallet Info
                      </button>

                      <button
                        onClick={() => copyToClipboard(account.address)}
                        className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Copy className="w-4 h-4 mr-3" />
                        Copy Address
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <LoadingConnectButton className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {proposalsError && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-3">
          <div className="container mx-auto flex items-center space-x-2 text-yellow-300">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Failed to load proposals: {proposalsError.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Vote className="w-8 h-8 text-cyan-400" />
              <span className="text-green-400 text-sm font-medium">Live</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalVotes.toLocaleString()}</div>
            <div className="text-gray-400">Total Votes</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-400" />
              <span className="text-green-400 text-sm font-medium">Active</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.activePolls}</div>
            <div className="text-gray-400">Active Proposals</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-400" />
              <span className="text-green-400 text-sm font-medium">+2.3%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{proposals.length}</div>
            <div className="text-gray-400">Total Proposals</div>
          </div>
        </div>

        {/* Proposals Grid */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Blockchain Proposals</h2>
            {account && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>New Proposal</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {proposalsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              </div>
            ) : ownedObjects.data.length === 0 ? (
              <div className="text-center py-12">
                <Vote className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">No proposals found</p>
                <p className="text-gray-500 text-sm mb-6">
                  {account ? 'Be the first to create a proposal!' : 'Connect your wallet to view proposals'}
                </p>
                {account && (
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Create First Proposal
                  </button>
                )}
              </div>

            ) : (
              ownedObjects.data.map((proposal) => (
                <div
                  key={proposal.data.objectId}
                  className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedPoll(proposal)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-white font-semibold">{proposal.data.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${proposal.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                          }`}>
                          {proposal.data.status}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{proposal.data.objectId}</p>
                      <p className="text-gray-400 text-xs">
                        Created by: {truncateAddress(proposal.data.creator)}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* <div className="space-y-2 mb-4">
                    {proposal.options.map((option, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm font-medium">
                            {option.name} ({option.votes} votes)
                          </span>
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
                  </div> */}

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{proposal.participants} participants</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{getTimeRemaining(proposal.endTime)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Create Proposal Modal - Now properly using the component */}
      <CreateProposalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Wallet Info Modal */}
      {isWalletInfoOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Wallet className="w-6 h-6 mr-2 text-cyan-400" />
                Wallet Info
              </h3>
              <button
                onClick={() => setIsWalletInfoOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Wallet Address</div>
                <div className="flex items-center justify-between">
                  <code className="text-white text-sm font-mono">{truncateAddress(walletInfo.address)}</code>
                  <button
                    onClick={() => copyToClipboard(walletInfo.address)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Balance</div>
                <div className="text-white font-semibold">{walletInfo.balance}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1">Network</div>
                  <div className="text-white text-sm">{walletInfo.network}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1">Status</div>
                  <div className="text-green-400 text-sm">Connected</div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Connected & Active</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => setIsWalletInfoOpen(false)}
                className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
