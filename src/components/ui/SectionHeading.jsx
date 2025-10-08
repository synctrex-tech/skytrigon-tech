export default function SectionHeading({ title, eyebrow, description, align = 'left' }) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
