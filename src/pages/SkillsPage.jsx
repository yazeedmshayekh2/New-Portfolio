import Skills from '../components/Skills/Skills';
import './Pages.scss';

export default function SkillsPage() {
  return (
    <>
      <section className="page-intro page-intro--compact">
        <div className="page-intro-container">
          <h1>Skills</h1>
          <p>A complete breakdown of your AI, ML, engineering, and tooling capabilities.</p>
        </div>
      </section>
      <Skills />
    </>
  );
}
