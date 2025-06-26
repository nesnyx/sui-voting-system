"use client"

import Link from 'next/link'

export default function Footer() {
  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Roadmap', href: '#roadmap' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '/api' }
    ],
    Resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Blog', href: '/blog' },
      { name: 'Community', href: '/community' }
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Contact', href: '/contact' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Disclaimer', href: '/disclaimer' }
    ]
  }

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Discord', href: '#', icon: '💬' },
    { name: 'Telegram', href: '#', icon: '📱' },
    { name: 'GitHub', href: '#', icon: '🐙' }
  ]

  return (
    <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl"></div>
              <span className="text-white font-bold text-2xl">Web3Hub</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Building the future of decentralized finance with cutting-edge technology and user-centric design.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-lg hover:bg-white/20 hover:border-white/40 transition-all"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2024 Web3Hub. All rights reserved.
          </div>

          {/* Network Status */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-400">All systems operational</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400">Network: </span>
              <span className="text-cyan-400 ml-1">Ethereum Mainnet</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
