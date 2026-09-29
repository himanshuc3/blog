import React from 'react';

interface Props {
  label: string;
  src?: string | null;
  shape?: 'round' | 'rect' | 'blob';
  className?: string;
  style?: React.CSSProperties;
}

/** An image slot. Renders `src` when set, otherwise a dashed, labelled stand-in. */
const Placeholder: React.FC<Props> = ({ label, src, shape = 'rect', className = '', style }) =>
  src ? (
    <img className={`ph-img ${className}`} src={src} alt="" style={style} draggable={false} />
  ) : (
    <span className={`ph ph--${shape} ${className}`} style={style} role="img" aria-label={label}>
      <span className="ph__label">{label}</span>
    </span>
  );

export default Placeholder;
