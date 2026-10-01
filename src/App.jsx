import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Process from './components/Process'
import Services from './components/Services'
import SmeltingCalculator from './components/SmeltingCalculator'
import Standards from './components/Standards'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ivory text-ink">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Standards />
        <SmeltingCalculator />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
