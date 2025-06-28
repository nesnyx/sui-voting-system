"use client"

import { useState } from 'react'
import { useVoting } from '@/hooks/useVoting'
import { 
  X, 
  Calendar, 
  FileText, 
  Type, 
  Loader2, 
  Plus, 
  AlertCircle,
  CheckCircle
} from 'lucide-react'

const CreateProposalModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    durationDays: 7
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)

  const { createProposal, isLoading, error, clearError } = useVoting()

  const validateForm = () => {
    const errors = {}

    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    } else if (formData.title.length > 100) {
      errors.title = 'Title must be less than 100 characters'
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required'
    } else if (formData.description.length > 500) {
      errors.description = 'Description must be less than 500 characters'
    }

    if (formData.durationDays < 1 || formData.durationDays > 365) {
      errors.durationDays = 'Duration must be between 1 and 365 days'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    // Calculate expiration timestamp
    const now = Math.floor(Date.now() / 1000)
    const durationSeconds = formData.durationDays * 24 * 60 * 60
    const expiration = now + durationSeconds

    await createProposal(
      {
        title: formData.title.trim(),
        description: formData.description.trim(),
        expiration: expiration
      },
      (result) => {
        // Success callback
        setIsSuccess(true)
        setTimeout(() => {
          resetForm()
          if (onSuccess) onSuccess(result)
          onClose()
        }, 2000)
      }
    )
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', durationDays: 7 })
    setFormErrors({})
    setIsSuccess(false)
    clearError()
  }

  const handleClose = () => {
    if (!isLoading) {
      resetForm()
      onClose()
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }

    // Clear global error
    if (error) {
      clearError()
    }
  }

  if (!isOpen) return null

  // Success state
  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Proposal Created Successfully!</h3>
            <p className="text-gray-300 mb-4">Your proposal has been submitted to the blockchain.</p>
            <p className="text-gray-400 text-sm">Closing automatically...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Plus className="w-6 h-6 mr-2 text-cyan-400" />
            Create New Proposal
          </h3>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 text-sm font-medium">Transaction Failed</p>
              <p className="text-red-400 text-xs mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              <Type className="w-4 h-4 inline mr-1" />
              Proposal Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter proposal title..."
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-white/5 border ${
                formErrors.title ? 'border-red-500' : 'border-white/10'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50`}
            />
            {formErrors.title && (
              <p className="text-red-400 text-xs mt-1">{formErrors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your proposal in detail..."
              rows={4}
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-white/5 border ${
                formErrors.description ? 'border-red-500' : 'border-white/10'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none disabled:opacity-50`}
            />
            {formErrors.description && (
              <p className="text-red-400 text-xs mt-1">{formErrors.description}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Voting Duration (Days)
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={formData.durationDays}
              onChange={(e) => handleInputChange('durationDays', parseInt(e.target.value) || 1)}
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-white/5 border ${
                formErrors.durationDays ? 'border-red-500' : 'border-white/10'
              } rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50`}
            />
            {formErrors.durationDays && (
              <p className="text-red-400 text-xs mt-1">{formErrors.durationDays}</p>
            )}
            <p className="text-gray-400 text-xs mt-1">
              Proposal will expire on: {new Date(Date.now() + formData.durationDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Create Proposal'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProposalModal
