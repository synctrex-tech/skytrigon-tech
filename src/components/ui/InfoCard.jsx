export default function InfoCard({ title, subtitle, description, icon, actions }) {
  return (
    <div className="info-card">
      {icon ? <div className="info-card-icon" aria-hidden>{icon}</div> : null}
      <div className="info-card-content">
        {subtitle ? <p className="info-card-subtitle">{subtitle}</p> : null}
        <h3 className="info-card-title">{title}</h3>
        {description ? <p className="info-card-description">{description}</p> : null}
      </div>
      {actions ? <div className="info-card-actions">{actions}</div> : null}
    </div>
  );
}
