'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside - FIXED VERSION
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if menu is open and click is outside both menu and button
      if (isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    // Only add listener if menu is open
    if (isMenuOpen) {
      // Use timeout to prevent immediate closing when opening
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)
      }, 100)

      return () => {
        clearTimeout(timer)
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('touchstart', handleClickOutside)
      }
    }
  }, [isMenuOpen])

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscKey)
      return () => document.removeEventListener('keydown', handleEscKey)
    }
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Prevent layout shift
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isMenuOpen, isMobile])

  const navigation = [
    { name: 'Features', href: '#features', icon: '⚡' },
    { name: 'About', href: '#about', icon: '🎯' },
    { name: 'Roadmap', href: '#roadmap', icon: '🗺️' },
    { name: 'Community', href: '#community', icon: '👥' },
    { name: 'Docs', href: '/docs', icon: '📚' }
  ]

  const handleMenuToggle = (e) => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = (e) => {
    setIsMenuOpen(false)
  }

  const handleBackdropClick = (e) => {
    e.stopPropagation()
    setIsMenuOpen(false)
  }

  const handleMenuPanelClick = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/20 shadow-2xl shadow-purple-500/10'
          : 'bg-black/20 backdrop-blur-md border-b border-white/10'
          }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center space-x-3 group z-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                  {/* Just the letter A with modern typography */}
                  <span className="text-white font-black text-lg sm:text-xl tracking-tight">A</span>
                  {/* Small voting indicator */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <span className="text-white font-bold text-xl sm:text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                Avoting
              </span>
            </Link>



            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 flex items-center space-x-1 group"
                >
                  <span className="group-hover:animate-bounce text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Connect Wallet Button - Desktop */}
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Connect Wallet</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={buttonRef}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-all duration-200 z-50"
              onClick={handleMenuToggle}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                    }`}
                ></span>
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                ></span>
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                    }`}
                ></span>
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
            }`}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          {/* Mobile Menu Panel */}
          <div
            ref={menuRef}
            className={`absolute top-20 left-4 right-4 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-purple-500/20 transform transition-all duration-300 ${isMenuOpen
              ? 'translate-y-0 opacity-100 scale-100'
              : '-translate-y-4 opacity-0 scale-95'
              }`}
            onClick={handleMenuPanelClick}
          >
            {/* Close Button in Menu */}
            <div className="flex justify-end p-4 pb-0">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 pb-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-1 mb-6">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <span className="font-medium text-lg">{item.name}</span>
                    <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 mb-6"></div>

              {/* Connect Wallet Button - Mobile */}
              <button
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center space-x-3 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Connect Wallet</span>
              </button>

              {/* Social Links - Mobile */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-4">Follow us</p>
                <div className="flex space-x-4">
                  {[
                    { name: 'Twitter', icon: '🐦', href: '#' },
                    { name: 'Discord', icon: '💬', href: '#' },
                    { name: 'Telegram', icon: '📱', href: '#' },
                    { name: 'GitHub', icon: '🐙', href: '#' }
                  ].map((social, index) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      onClick={handleLinkClick}
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-xl hover:bg-white/20 hover:border-white/40 hover:scale-110 transition-all duration-200"
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Network Status - Mobile */}
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">Network Status</span>
                </div>
                <span className="text-green-400 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
