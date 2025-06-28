"use client"

import { useAuth } from '@/contexts/WalletContext'
import { ConnectButton } from '@mysten/dapp-kit'
import { Loader2, Wallet, User } from 'lucide-react'

const LoadingConnectButton = ({ className = "" }) => {
  const { account, isLoading, isInitialized } = useAuth()

  // Show loading state during initialization or when loading
  if (!isInitialized || isLoading) {
    return (
      <div className={`flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg ${className}`}>
        <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
        <span className="text-gray-400 text-sm">Checking wallet...</span>
      </div>
    )
  }

  // If connected, show account info
  if (account) {
    return (
      <ConnectButton 
        connectText="Connect Wallet"
        connectedText={
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">
              {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
            </span>
            <span className="sm:hidden">Connected</span>
          </div>
        }
        className={className}
      />
    )
  }

  // If not connected, show connect button
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

export default LoadingConnectButton
