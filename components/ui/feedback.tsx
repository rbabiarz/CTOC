import type { ReactNode } from 'react';

/* ===== Avatar — initials monogram ===== */
interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <span className={`avatar avatar--${size}`} role="img" aria-label={name} title={name}>
      {initials}
    </span>
  );
}

/* ===== Empty — empty/zero state ===== */
interface EmptyProps {
  icon?: ReactNode;
  title: string;
  message?: string;
  action?: ReactNode;
}

export function Empty({ icon, title, message, action }: EmptyProps) {
  return (
    <div className="empty" role="status">
      {icon && <div className="empty__icon" aria-hidden="true">{icon}</div>}
      <div className="empty__title">{title}</div>
      {message && <div className="empty__msg">{message}</div>}
      {action && <div className="empty__action">{action}</div>}
    </div>
  );
}

/* ===== Spinner — loading indicator (respects reduced motion) ===== */
interface SpinnerProps {
  label?: string;
  size?: number;
}

export function Spinner({ label = 'Loading…', size = 18 }: SpinnerProps) {
  return (
    <span className="spinner" role="status" aria-label={label}>
      <span className="spinner__ring" style={{ width: size, height: size }} aria-hidden="true"></span>
    </span>
  );
}
