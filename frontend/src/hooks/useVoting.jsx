"use client"

import { useState } from 'react'
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'

const PACKAGE_ID = '0xefaa6e68ed27540f97b89a9b15c48f3e8b7b407ff49efc0f5ac52ca0d268b471'
const MODULE_NAME = 'dashboard'

export const useVoting = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()

  const createProposal = async ({ title, description, expiration }, onSuccess) => {
    try {
      setIsLoading(true)
      setError(null)

      const tx = new Transaction()

      // Call smart contract function
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_proposal`,
        arguments: [
          tx.pure.string(title),
          tx.pure.string(description),
          tx.pure.u64(expiration),
        ],
      })

      // Execute transaction
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log('Proposal created successfully:', result)
            setIsLoading(false)
            if (onSuccess) onSuccess(result)
          },
          onError: (error) => {
            console.error('Failed to create proposal:', error)
            setError(error.message || 'Failed to create proposal')
            setIsLoading(false)
          },
        }
      )
    } catch (err) {
      console.error('Create proposal error:', err)
      setError(err.message || 'An unexpected error occurred')
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return {
    createProposal,
    isLoading,
    error,
    clearError,
  }
}
