export default function BedVisual({ tone = 1, compact = false }: { tone?: number; compact?: boolean }) {
  return (
    <div className={`bed-visual tone-${tone} ${compact ? 'is-compact' : ''}`} aria-hidden="true">
      <span className="visual-orbit" />
      <div className="visual-bed"><span className="visual-pillow" /><span className="visual-leg first" /><span className="visual-leg last" /></div>
    </div>
  );
}
