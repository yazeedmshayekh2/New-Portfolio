import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Contact.scss';

export default function Contact() {
  const { contact, hero } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subject = `Portfolio Contact: ${formData.get('name')}`;
    const body = `Name: ${formData.get('name')}%0D%0AEmail: ${formData.get('email')}%0D%0A%0D%0A${formData.get('message')}`;
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container" ref={ref}>
        <h2 className={`section-title animate-blur ${isVisible ? 'visible' : ''}`}>
          Get In <span>Touch</span>
        </h2>

        <p className={`contact-subtitle animate-on-scroll delay-1 ${isVisible ? 'visible' : ''}`}>
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>

        <div className="contact-grid">
          <div className={`contact-info animate-slide-left delay-2 ${isVisible ? 'visible' : ''}`}>
            <a href={`mailto:${contact.email}`} className="contact-card">
              <div className="contact-card-icon"><FiMail /></div>
              <div className="contact-card-info">
                <span className="contact-card-label">Email</span>
                <span className="contact-card-value">{contact.email}</span>
              </div>
            </a>

            <a href={`tel:${contact.phone}`} className="contact-card">
              <div className="contact-card-icon"><FiPhone /></div>
              <div className="contact-card-info">
                <span className="contact-card-label">Phone</span>
                <span className="contact-card-value">{contact.phone}</span>
              </div>
            </a>

            <div className="contact-card">
              <div className="contact-card-icon"><FiMapPin /></div>
              <div className="contact-card-info">
                <span className="contact-card-label">Location</span>
                <span className="contact-card-value">{contact.location}</span>
              </div>
            </div>

            <div className="contact-socials">
              <a href={hero.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
            </div>
          </div>

          <form className={`contact-form animate-slide-right delay-3 ${isVisible ? 'visible' : ''}`} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input type="text" id="contact-name" name="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Your Email</label>
                <input type="email" id="contact-email" name="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input type="text" id="contact-subject" name="subject" placeholder="Project Inquiry" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" placeholder="Tell me about your project..." required />
            </div>
            <button type="submit" className="form-submit">
              <FiSend /> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
