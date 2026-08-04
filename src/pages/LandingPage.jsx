import { useDarkMode } from '../context/DarkModeContext'
import LandingNavbar from '../components/landing/LandingNavbar'
import HeroSection from '../components/landing/HeroSection'
import AboutSection from '../components/landing/AboutSection'
import OdsSection from '../components/landing/OdsSection'
import ColaborarSection from '../components/landing/ColaborarSection'
import ContactSection from '../components/landing/ContactSection'
import DonateSection from '../components/landing/DonateSection'
import Footer from '../components/Footer'

export default function LandingPage() {
  const { dark } = useDarkMode()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={`min-h-screen ${dark ? 'dark bg-gray-950' : 'bg-white'}`}>
      <LandingNavbar scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <AboutSection />
      <OdsSection />
      <ContactSection />
      <ColaborarSection />
      <DonateSection />
      <Footer />
    </div>
  )
}
