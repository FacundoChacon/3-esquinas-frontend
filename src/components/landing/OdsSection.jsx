import { useRef, useState, useCallback } from 'react'
import { ODS_LIST } from './odsData'
import ODSFlipCard from './ODSFlipCard'
import { useDarkMode } from '../../context/DarkModeContext'

const CARD_COUNT = ODS_LIST.length
const STEP = 360 / CARD_COUNT
const RADIUS = 520

export default function OdsSection() {
  const { dark } = useDarkMode()
  const [flippedODS, setFlippedODS] = useState([])
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef(null)
  const suppressClickRef = useRef(false)

  const toggleODS = useCallback((id) => {
    setFlippedODS((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }, [])

  const handleCardClick = useCallback((id) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    const index = ODS_LIST.findIndex((o) => o.id === id)
    if (index === -1) return
    const target = index * STEP
    let delta = ((target - rotation) % 360 + 540) % 360 - 180
    if (Math.abs(delta) < STEP * 0.45) {
      toggleODS(id)
    } else {
      setRotation((r) => r + delta)
    }
  }, [rotation, toggleODS])

  const rotate = useCallback((dir) => {
    setRotation((r) => r + dir * STEP)
  }, [])

  const handlePointerDown = useCallback((e) => {
    dragRef.current = { startX: e.clientX, startRotation: rotation, moved: false }
    setIsDragging(true)
  }, [rotation])

  const handlePointerMove = useCallback((e) => {
    const drag = dragRef.current
    if (!drag) return
    const dx = e.clientX - drag.startX
    if (Math.abs(dx) > 4) drag.moved = true
    setRotation(drag.startRotation + dx * 0.35)
  }, [])

  const handlePointerUp = useCallback(() => {
    if (!dragRef.current) return
    const moved = dragRef.current.moved
    dragRef.current = null
    setIsDragging(false)
    setRotation((r) => Math.round(r / STEP) * STEP)
    if (moved) suppressClickRef.current = true
  }, [])

  const worldAngle = (index) => {
    let a = ((index * STEP - rotation) % 360 + 360) % 360
    if (a > 180) a -= 360
    return a
  }

  return (
    <section id="ods" className="landing-ods">
      <div className="landing-ods-inner">
        <h2 className="landing-ods-title">Objetivos de Desarrollo Sostenible</h2>
        <p className="landing-ods-subtitle">Agenda 2030 — ONU</p>
        <div className="landing-ods-wheel-wrapper">
          <button onClick={() => rotate(-1)} className="landing-ods-arrow landing-ods-arrow--left" aria-label="Anterior">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div
            className="landing-ods-wheel"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div
              className={`landing-ods-wheel-stage ${isDragging ? 'landing-ods-wheel-stage--dragging' : ''}`}
              style={{ transform: `rotateY(${rotation}deg)` }}
            >
              {ODS_LIST.map((ods, index) => {
                const angle = worldAngle(index)
                const opacity = Math.max(0.06, Math.cos((angle * Math.PI) / 180))
                return (
                  <ODSFlipCard
                    key={ods.id}
                    ods={ods}
                    active={Math.abs(angle) < STEP * 0.45}
                    flipped={flippedODS.includes(ods.id)}
                    onToggle={() => handleCardClick(ods.id)}
                    dark={dark}
                    style={{
                      transform: `translate(-50%, -50%) rotateY(${index * STEP}deg) translateZ(${RADIUS}px)`,
                      opacity,
                      pointerEvents: Math.abs(angle) > 90 ? 'none' : 'auto',
                    }}
                  />
                )
              })}
            </div>
          </div>
          <button onClick={() => rotate(1)} className="landing-ods-arrow landing-ods-arrow--right" aria-label="Siguiente">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
