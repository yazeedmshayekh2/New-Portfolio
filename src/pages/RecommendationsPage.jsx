import Recommendations from '../components/Recommendations/Recommendations';
import './Pages.scss';

export default function RecommendationsPage() {
  return (
    <>
      <section className="page-intro page-intro--compact">
        <div className="page-intro-container">
          <h1>Recommendations</h1>
          <p>Letters of support and endorsements from professionals and academic instructors.</p>
        </div>
      </section>
      <Recommendations />
    </>
  );
}
