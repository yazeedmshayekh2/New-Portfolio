import Certifications from '../components/Certifications/Certifications';
import './Pages.scss';

export default function CertificatesPage() {
  return (
    <>
      <section className="page-intro page-intro--compact">
        <div className="page-intro-container">
          <h1>Certificates</h1>
          <p>A dedicated page to present certifications and continuous learning milestones.</p>
        </div>
      </section>
      <Certifications />
    </>
  );
}
