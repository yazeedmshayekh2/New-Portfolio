import './SectionDivider.scss';

export default function SectionDivider() {
  return (
    <div className="section-divider">
      <div className="divider-code">
        <span className="divider-comment">{'// ─────────────────────────────────────'}</span>
      </div>
      <div className="divider-glow" />
    </div>
  );
}
