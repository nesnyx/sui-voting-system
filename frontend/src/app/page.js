
import Header from './global_component/header'
import Features from './global_component/feature'
import Stats from './global_component/stats'
import Footer from './global_component/footer'
import CTA from './global_component/cta'
import Hero from './global_component/hero'
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <Hero />
      <Features />
      {/* <Stats /> */}
      <CTA />
      <Footer />
    </div>
  )
}
