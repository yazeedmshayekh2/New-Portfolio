import Volunteering from '../components/Volunteering/Volunteering';
import './Pages.scss';

export default function VolunteeringPage() {
  return (
    <>
      <section className="page-intro page-intro--compact">
        <div className="page-intro-container">
          <h1>Volunteering</h1>
          <p>Community contribution and leadership milestones in tech mentorship and event coordination.</p>
        </div>
      </section>
      <Volunteering />
    </>
  );
}
