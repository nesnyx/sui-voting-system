"use client"

import { useAuth } from '@/contexts/WalletContext'
import { ConnectButton } from '@mysten/dapp-kit'
import { Wallet, CheckCircle, Loader2, Shield } from 'lucide-react'

const ProtectedLayout = ({ children }) => {
  const { account, isAuthenticated, isLoading } = useAuth()

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Initializing...</p>
          <p className="text-gray-400 text-sm mt-2">Checking wallet connection</p>
        </div>
      </div>
    )
  }

  // If not authenticated, show connect screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-gray-300 mb-8">
            You need to connect your Sui wallet to access this application
          </p>

          <div className="space-y-4 mt-2">
            {/* Mysten DApp Kit Connect Button */}
            <ConnectButton 
              connectText="Connect Sui Wallet"
              className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            />

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400 mt-4">
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
              <strong>Supported Wallets:</strong> Sui Wallet, Suiet, Ethos Wallet, and more
            </p>
          </div>
          <div className='pt-4 flex justify-center'>
            <a href="/"  className="bg-gradient-to-r from-cyan-700 to-purple-900 text-gray-300 rounded-xl hover:shadow-lg transition-all font-medium px-4 py-2">Go Home</a>
          </div>
        </div>
      </div>
    )
  }

  // If authenticated, render children
  return children
}

export default ProtectedLayout
