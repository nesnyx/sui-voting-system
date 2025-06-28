"use client"
import Header from '../global_component/header'
import Link from 'next/link'
import {
  Shield,
  Vote,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Github,
  ExternalLink,
  Zap,
  Lock,
  Globe,
  Code,
  BookOpen,
  Target
} from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      title: "Trustless & Transparent",
      description: "Built on Sui blockchain for complete transparency. No central authority can manipulate votes or results."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Fast & Efficient",
      description: "Leverage Sui's parallel execution model for instant voting with minimal gas fees and maximum throughput."
    },
    // {
    //   icon: <Lock className="w-8 h-8 text-green-400" />,
    //   title: "Secure by Design",
    //   description: "Smart contracts audited and tested. Your vote is cryptographically secured and immutable on-chain."
    // },
    // {
    //   icon: <Users className="w-8 h-8 text-purple-400" />,
    //   title: "Community Driven",
    //   description: "Empower communities to make collective decisions with provable fairness and equal participation rights."
    // }
  ]

  const howItWorks = [
    {
      step: "01",
      title: "Connect Wallet",
      description: "Connect your Sui wallet to participate in the voting ecosystem"
    },
    {
      step: "02", 
      title: "Browse Proposals",
      description: "Explore active proposals and understand the voting options available"
    },
    {
      step: "03",
      title: "Cast Your Vote",
      description: "Submit your vote securely on-chain with cryptographic proof"
    },
    {
      step: "04",
      title: "Track Results",
      description: "Monitor real-time results with complete transparency and verifiability"
    }
  ]

  const stats = [
    { label: "Total Votes Cast", value: "150K+", icon: <Vote className="w-6 h-6" /> },
    { label: "Active Proposals", value: "24", icon: <Target className="w-6 h-6" /> },
    { label: "Community Members", value: "5.2K", icon: <Users className="w-6 h-6" /> },
    { label: "Gas Saved", value: "99%", icon: <Zap className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      {/* <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-white font-bold text-xl">voting</span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link 
                href="/dashboard" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/about" 
                className="text-white font-medium"
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav> */}
      <Header/>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center pt-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Trustless Voting on 
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Sui</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience the future of democratic decision-making with our decentralized voting platform. 
              Built on Sui blockchain for unparalleled speed, security, and transparency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                <span>Start Voting</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://github.com/nesnyx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-8 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all"
              >
                <Github className="w-5 h-5" />
                <span>View Source</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-center mb-3 text-cyan-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built on cutting-edge Sui blockchain technology to deliver the most secure and efficient voting experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Participate in trustless voting with just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sui Protocol Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Powered by Sui Protocol</h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Sui is a next-generation smart contract platform with high throughput, low latency, and an asset-oriented programming model powered by the Move programming language.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Parallel Execution</h3>
                <p className="text-gray-300">
                  Process thousands of transactions simultaneously for instant voting results
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Global Accessibility</h3>
                <p className="text-gray-300">
                  Participate from anywhere in the world with minimal fees and maximum security
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <Code className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Move Language</h3>
                <p className="text-gray-300">
                  Built with Move programming language for enhanced security and performance
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://sui.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Learn about Sui</span>
              </a>
              <a
                href="https://docs.sui.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Documentation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              The Benefits of Trustless Voting
            </h2>

            <div className="space-y-8">
              <div className="flex items-start space-x-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Immutable Records</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every vote is permanently recorded on the blockchain, creating an immutable audit trail that cannot be altered or deleted by any party.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">No Central Authority</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Eliminate the risk of manipulation by removing central authorities. The protocol governs itself through smart contracts and community consensus.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Real-time Transparency</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Monitor voting progress in real-time with full transparency. Anyone can verify the results independently using blockchain explorers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Global Participation</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Enable worldwide participation without geographical restrictions. Anyone with a Sui wallet can participate in governance decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience Trustless Voting?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who are already participating in the future of democratic decision-making.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                <Vote className="w-5 h-5" />
                <span>Start Voting Now</span>
              </Link>
              <a
                href="https://github.com/nesnyx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-8 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all"
              >
                <Github className="w-5 h-5" />
                <span>Contribute</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-white font-bold text-xl">voting</span>
            </div>

            <div className="text-gray-400 text-sm">
              © 2025 Trustless Voting. Built on Sui Protocol.
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/nesnyx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://sui.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
