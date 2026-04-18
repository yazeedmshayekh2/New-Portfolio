import Contact from '../components/Contact/Contact';
import './Pages.scss';

export default function ContactPage() {
  return (
    <>
      <section className="page-intro page-intro--compact">
        <div className="page-intro-container">
          <h1>Contact</h1>
          <p>Open for AI projects, collaborations, and consulting opportunities.</p>
        </div>
      </section>
      <Contact />
    </>
  );
}
