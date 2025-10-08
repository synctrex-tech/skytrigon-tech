import { Link } from 'react-router-dom';
import { FiAirplay, FiBarChart2, FiCpu, FiRefreshCcw, FiZap } from 'react-icons/fi';
import ActionButton from '../components/ui/ActionButton.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import InfoCard from '../components/ui/InfoCard.jsx';
import {
  heroContent,
  solutionPillars,
  servicesCatalog,
  successNarratives,
  innovationTimeline,
  partnershipLogos
} from '../data/homeContent.js';

const pillarIcons = {
  experience: <FiZap aria-hidden />,
  analytics: <FiBarChart2 aria-hidden />,
  automation: <FiRefreshCcw aria-hidden />
};

export default function Home() {
  return (
    <div className="home-view">
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="hero-content">
            <p className="hero-eyebrow">{heroContent.eyebrow}</p>
            <h1 id="hero-title" className="hero-title">{heroContent.title}</h1>
            <p className="hero-description">{heroContent.description}</p>
            <div className="hero-actions">
              <ActionButton as={Link} to={heroContent.primaryCta.to} variant="primary" size="lg">
                {heroContent.primaryCta.label}
              </ActionButton>
              <ActionButton as={Link} to={heroContent.secondaryCta.to} variant="outline" size="lg">
                {heroContent.secondaryCta.label}
              </ActionButton>
            </div>
            <dl className="hero-stats">
              {heroContent.stats.map((item) => (
                <div key={item.label} className="hero-stat-item">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="hero-visual" aria-hidden>
            <div className="hero-visual-card">
              <FiAirplay />
              <div>
                <p>Always-on command center</p>
                <span>Observe, automate, and adapt in one unified view.</span>
              </div>
            </div>
            <div className="hero-visual-card">
              <FiCpu />
              <div>
                <p>Intelligence fabric</p>
                <span>Connect data streams with responsible AI guardrails.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pillars-section" aria-labelledby="pillars-heading">
        <SectionHeading
          align="center"
          eyebrow="Solution pillars"
          title="Balance bold experimentation with enterprise-grade governance"
          description="Ground your digital ecosystem in pillars that bring teams, technology, and operations into harmony."
        />
        <div className="pillars-grid">
          {solutionPillars.map((pillar) => (
            <div key={pillar.id} className="pillar-card">
              <div className="pillar-icon">{pillarIcons[pillar.icon]}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services-section" aria-labelledby="services-heading">
        <SectionHeading
          eyebrow="Services"
          title="Expert teams guiding your next chapter"
          description="From modernization roadmaps to growth accelerators, we partner with your teams to deliver measurable outcomes."
        />
        <div className="services-cards">
          {servicesCatalog.map((service) => (
            <InfoCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={<FiAirplay aria-hidden />}
              actions={
                <ul className="service-metrics">
                  {service.metrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
              }
            />
          ))}
        </div>
      </section>

      <section className="success-section" aria-labelledby="success-heading">
        <SectionHeading
          align="center"
          eyebrow="Customer stories"
          title="Outcomes that compound"
          description="Operators, product leaders, and strategists rely on Skytrigon to scale resilient experiences."
        />
        <div className="success-grid">
          {successNarratives.map((story) => (
            <figure key={story.id} className="success-card">
              <blockquote>{story.quote}</blockquote>
              <figcaption>
                <span>{story.company}</span>
                <span>{story.author}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="timeline-section" aria-labelledby="timeline-heading">
        <SectionHeading
          eyebrow="Innovation journey"
          title="A track record of responsible acceleration"
          description="Every milestone unlocks a new chapter for our clients to innovate safely."
        />
        <ol className="timeline-list">
          {innovationTimeline.map((entry) => (
            <li key={entry.year} className="timeline-item">
              <div className="timeline-marker" aria-hidden />
              <div className="timeline-content">
                <span className="timeline-year">{entry.year}</span>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="partners-section" aria-labelledby="partners-heading">
        <SectionHeading
          align="center"
          eyebrow="Allied network"
          title="Built with trusted partners"
          description="We collaborate with ecosystem leaders to deliver interoperable, future-proof platforms."
        />
        <div className="partners-strip">
          {partnershipLogos.map((partner) => (
            <div key={partner.id} className="partner-chip" role="presentation">
              {partner.name}
            </div>
          ))}
        </div>
        <div className="cta-panel">
          <div>
            <h3>Ready to orchestrate your next chapter?</h3>
            <p>Discover how Skytrigon Tech unlocks new value across your digital operations.</p>
          </div>
          <ActionButton as={Link} to="/contact" variant="primary" size="lg">
            Connect with us
          </ActionButton>
        </div>
      </section>
    </div>
  );
}
