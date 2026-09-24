export default function ODSFlipCard({ ods, flipped, onToggle, dark, active = false, style }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div
      className="landing-ods-card"
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={active ? 0 : -1}
      aria-pressed={flipped}
      aria-label={`ODS ${String(ods.id).padStart(2, '0')} — ${ods.label}. ${flipped ? 'Volteado. ' : ''}Presiona para voltear`}
      style={style}
    >
      <div className={`landing-ods-card-inner ${active ? 'landing-ods-card-inner--active' : ''} ${flipped ? 'flipped' : ''}`}>
        <div className="landing-ods-card-front" style={{ backgroundColor: ods.color }}>
          <div className="landing-ods-card-number">{String(ods.id).padStart(2, '0')}</div>
          <div className="landing-ods-card-photo">
            <img src={ods.img} alt={ods.label} className="w-full h-full object-cover" />
          </div>
          <div className="landing-ods-card-label">{ods.label}</div>
          <p className="landing-ods-card-desc">{ods.desc}</p>
        </div>
        <div className={`landing-ods-card-back ${dark ? 'dark' : ''}`}>
          <div className="landing-ods-card-back-ods">ODS {String(ods.id).padStart(2, '0')}</div>
          <div className="landing-ods-card-back-title">{ods.label}</div>
          <p className="landing-ods-card-back-desc">Próximamente conocerás cómo trabajamos en este objetivo desde 3 Esquinas.</p>
          <div className="landing-ods-card-back-hint">Tocar para voltear</div>
        </div>
      </div>
    </div>
  )
}
