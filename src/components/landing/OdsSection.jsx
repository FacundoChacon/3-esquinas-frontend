import { useRef, useState, useCallback, useEffect } from 'react'
import { ODS_LIST } from './odsData'
import ODSFlipCard from './ODSFlipCard'
import { useDarkMode } from '../../context/DarkModeContext'

export default function OdsSection() {
  const { dark } = useDarkMode()
  const [flippedODS, setFlippedODS] = useState([])
  const carouselRef = useRef(null)

  const toggleODS = useCallback((id) => {
    setFlippedODS((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }, [])

  const handleODSClick = useCallback((id, index) => {
    const container = carouselRef.current
    if (!container) return
    const card = container.children[index]
    if (!card) return
    const containerCenter = container.scrollLeft + container.clientWidth / 2
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const distance = Math.abs(containerCenter - cardCenter)

    if (distance < card.offsetWidth * 0.35) {
      toggleODS(id)
    } else {
      const scrollTarget = card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2
      container.scrollTo({ left: scrollTarget, behavior: 'smooth' })
    }
  }, [toggleODS])

  const scrollCarousel = useCallback((direction) => {
    if (!carouselRef.current) return
    const scrollAmount = 310
    carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    let rafId = null

    const updateCards = () => {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth
      const containerCenter = scrollLeft + containerWidth / 2
      const cards = Array.from(container.children)

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(containerCenter - cardCenter)
        const cardWidth = card.offsetWidth
        const ratio = distance / cardWidth

        const isCentered = ratio < 0.35
        const inner = card.querySelector('.landing-ods-card-inner')

        let scale, opacity, glow
        if (isCentered) {
          scale = 1
          opacity = 1
          glow = '0 0 0 2px rgba(16,185,129,0.5), 0 0 20px rgba(16,185,129,0.25)'
        } else if (ratio < 1.3) {
          scale = 0.82
          opacity = 0.5
          glow = 'none'
        } else {
          scale = 0.7
          opacity = 0.25
          glow = 'none'
        }

        card.style.transform = `scale(${scale})`
        card.style.opacity = opacity

        if (inner) {
          inner.style.boxShadow = glow
          if (!isCentered && inner.classList.contains('flipped')) {
            inner.classList.remove('flipped')
          }
        }
      })
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateCards)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    updateCards()

    return () => {
      container.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="ods" className="landing-ods">
      <div className="landing-ods-inner">
        <h2 className="landing-ods-title">Objetivos de Desarrollo Sostenible</h2>
        <p className="landing-ods-subtitle">Agenda 2030 — ONU</p>
        <div className="landing-ods-carousel-wrapper">
          <button onClick={() => scrollCarousel('left')} className="landing-ods-arrow landing-ods-arrow--left" aria-label="Anterior">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div ref={carouselRef} className="landing-ods-carousel">
            {ODS_LIST.map((ods, index) => (
              <ODSFlipCard key={ods.id} ods={ods} flipped={flippedODS.includes(ods.id)} onToggle={() => handleODSClick(ods.id, index)} dark={dark} />
            ))}
          </div>
          <button onClick={() => scrollCarousel('right')} className="landing-ods-arrow landing-ods-arrow--right" aria-label="Siguiente">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
