"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit"

const WalletContext = createContext()

export const AuthProvider = ({ children }) => {
  const account = useCurrentAccount()
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState(null)




  const{data : ownedObjects, isPending} = useSuiClientQuery(
    "getOwnedObjects",{
      owner:account?.address
    },{
      enabled:!!account,
      
    },
    {
      options:{
        showType:true,
        showOwner : true,
        showContent : true
      }
    }
  )

  // Query balance langsung di context
  const { 
    data: balanceData, 
    isPending: balanceLoading 
  } = useSuiClientQuery(
    'getBalance',
    {
      owner: account?.address || '',
      coinType: '0x2::sui::SUI'
    },
    {
      enabled: !!account?.address,
      retry: 3,
    }
  )

  useEffect(() => {
    try {
      const initTimer = setTimeout(() => {
        setIsInitialized(true)
      }, 500)

      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 1200)

      return () => {
        clearTimeout(initTimer)
        clearTimeout(loadingTimer)
      }
    } catch (err) {
      console.error('WalletContext initialization error:', err)
      setError(err.message)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isInitialized) {
      try {
        setIsLoading(true)
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 300)

        return () => clearTimeout(timer)
      } catch (err) {
        console.error('Account change error:', err)
        setError(err.message)
        setIsLoading(false)
      }
    }
  }, [account, isInitialized])

  const isAuthenticated = !!account

  // Utility functions
  const truncateAddress = (address) => {
    if (!address || typeof address !== 'string') return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getBalance = () => {
    if (!balanceData) return '0 SUI'
    return `${(parseInt(balanceData.totalBalance) / 1_000_000_000).toFixed(2)} SUI`
  }

  const walletInfo = {
    address: account?.address || '',
    balance: getBalance(),
    network: 'Sui Testnet',
    type: 'Sui Wallet',
    connected: new Date().toLocaleString(),
  }

  return (
    <WalletContext.Provider value={{ 
      account, 
      isAuthenticated, 
      isLoading: isLoading || balanceLoading,
      isInitialized,
      error,
      walletInfo,
      truncateAddress,
      balanceData,
      ownedObjects
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
