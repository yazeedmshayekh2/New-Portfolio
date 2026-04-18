import Projects from '../components/Projects/Projects';
import './Pages.scss';

export default function ProjectsPage() {
  return (
    <>
      <section className="page-intro page-intro--compact">
        <div className="page-intro-container">
          <h1>Projects</h1>
          <p>Browse your work with category filters and quick tabs to switch from one project to another.</p>
        </div>
      </section>
      <Projects />
    </>
  );
}
