import { useState } from 'react';
import { FiSend, FiMapPin, FiMail, FiPhoneCall, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ActionButton from '../components/ui/ActionButton.jsx';

const contactDetails = [
  {
    id: 'phone',
    icon: <FiPhoneCall aria-hidden />,
    label: 'Phone',
    value: '+1 (415) 555-0172'
  },
  {
    id: 'email',
    icon: <FiMail aria-hidden />,
    label: 'Email',
    value: 'hello@skytrigon.tech'
  },
  {
    id: 'location',
    icon: <FiMapPin aria-hidden />,
    label: 'Location',
    value: '575 Market Street, Suite 2100, San Francisco, CA'
  }
];

const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/skytrigon', icon: <FiLinkedin aria-hidden /> },
  { id: 'twitter', label: 'Twitter', href: 'https://twitter.com/skytrigon', icon: <FiTwitter aria-hidden /> },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/skytrigon', icon: <FiFacebook aria-hidden /> }
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-view">
      <SectionHeading
        align="center"
        eyebrow="Contact"
        title="Let's design the future of your platform"
        description="Share a few details about your vision and our strategists will reach out within 48 hours."
      />

      <div className="contact-grid">
        <div className="contact-details">
          <h3>Reach out directly</h3>
          <ul className="contact-list">
            {contactDetails.map((detail) => (
              <li key={detail.id}>
                <span className="contact-icon">{detail.icon}</span>
                <div>
                  <span className="contact-label">{detail.label}</span>
                  <span className="contact-value">{detail.value}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="contact-social">
            <span>Follow Skytrigon Tech</span>
            <div className="social-links">
              {socialLinks.map((item) => (
                <a key={item.id} className="social-link" href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="contact-topic">Topic</label>
          <input
            id="contact-topic"
            name="topic"
            value={formState.topic}
            onChange={handleChange}
            placeholder="Launch strategy, modernization, automation..."
            required
          />
          <label htmlFor="contact-message">How can we help?</label>
          <textarea
            id="contact-message"
            name="message"
            rows="4"
            value={formState.message}
            onChange={handleChange}
            required
          />
          <ActionButton type="submit" variant="primary" size="lg" leftIcon={<FiSend aria-hidden />}>
            {submitted ? 'Message sent' : 'Send message'}
          </ActionButton>
        </form>
      </div>
    </div>
  );
}
