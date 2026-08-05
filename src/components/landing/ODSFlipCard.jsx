export default function ODSFlipCard({ ods, flipped, onToggle, dark }) {
  return (
    <div className="landing-ods-card" data-ods-id={ods.id} onClick={onToggle}>
      <div className={`landing-ods-card-inner ${flipped ? 'flipped' : ''}`}>
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
