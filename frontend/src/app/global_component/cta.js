'use client'
import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulasi subscription
    setIsSubscribed(true)
    setTimeout(() => setIsSubscribed(false), 3000)
    setEmail('')
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full filter blur-3xl"></div> */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Web3 Journey?</span>
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of users who are already building, trading, and earning in the decentralized economy. Get started in less than 2 minutes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:-translate-y-1 flex items-center">
              <span>Launch App</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <button className="border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm flex items-center">
              <span>View Documentation</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </button>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Get the latest updates on new features and platform developments</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50"
                disabled={isSubscribed}
              >
                {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Security Audited</span>
            </div>
            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3 3 0 001.466 0C8.967 2.724 10.375 2 12 2s3.033.724 4.267 1.455a3 3 0 001.466 0A2.5 2.5 0 0120 6v2a11.951 11.951 0 01-10 11.75A11.951 11.951 0 010 8V6a2.5 2.5 0 012.267-2.545zM10 6a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V7a1 1 0 00-1-1H10z" clipRule="evenodd" />
              </svg>
              <span>Non-Custodial</span>
            </div>
            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
