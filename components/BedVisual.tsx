export default function BedVisual({
  tone = 1,
  compact = false,
  reclining = false,
  portable = false,
}: {
  tone?: number;
  compact?: boolean;
  reclining?: boolean;
  portable?: boolean;
}) {
  return (
    <div className={`bed-visual tone-${tone} ${compact ? 'is-compact' : ''}`} aria-label="デモ商品画像">
      <span className="demo-image-label">デモ画像</span>
      <div className={`visual-bed ${reclining ? 'has-recline' : ''} ${portable ? 'is-portable' : ''}`}>
        <span className="visual-backrest" />
        <span className="visual-mattress" />
        <span className="visual-base" />
        <span className="visual-leg first" />
        <span className="visual-leg last" />
      </div>
    </div>
  );
}
