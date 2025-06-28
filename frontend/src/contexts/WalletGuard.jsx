"use client"

import { useAuth} from '@/contexts/WalletContext'
import { Wallet, CheckCircle, Loader2 } from 'lucide-react'

const WalletGuard = ({ children }) => {
  const { isConnected, isLoading, connectWallet } = useWallet()

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Checking wallet connection...</p>
        </div>
      </div>
    )
  }

  // If not connected, show connect screen
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">A</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">Connect Sui Wallet</h1>
          <p className="text-gray-300 mb-8">
            You need to connect your Sui wallet to access the dashboard
          </p>

          <div className="space-y-4">
            <button
              onClick={connectWallet}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Wallet className="w-5 h-5" />
              <span>Connect Sui Wallet</span>
            </button>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Decentralized</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-300 text-sm">
              <strong>Note:</strong> Make sure you have Sui Wallet extension installed in your browser.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // If connected, render children (Dashboard)
  return children
}

export default WalletGuard
