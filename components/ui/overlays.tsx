'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/* ===== Modal — centered dialog with focus trap + restore + Escape ===== */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const node = ref.current;
    node?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !node) return;
      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="modal-mask" onClick={onClose} aria-hidden="true"></div>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1} ref={ref}>
        <div className="modal__head">
          <h2 className="modal__title" id="modal-title">{title}</h2>
          <button type="button" className="modal__close" aria-label="Close dialog" onClick={onClose}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__foot">{footer}</div>}
      </div>
    </>
  );
}

/* ===== Alert / Toast — tinted banner; tone pairs color with a dot + label ===== */
export type AlertTone = 'critical' | 'warning' | 'success' | 'info' | 'neutral';

interface AlertProps {
  tone?: AlertTone;
  title?: ReactNode;
  children: ReactNode;
  onDismiss?: () => void;
}

function AlertBody({ tone = 'neutral', title, children, onDismiss }: AlertProps) {
  return (
    <>
      <span className="alert__dot" aria-hidden="true"></span>
      <div className="alert__content">
        {title && <div className="alert__title">{title}</div>}
        <div className="alert__msg">{children}</div>
      </div>
      {onDismiss && (
        <button type="button" className="alert__close" aria-label="Dismiss" onClick={onDismiss}>
          <span aria-hidden="true">✕</span>
        </button>
      )}
    </>
  );
}

export function Alert({ tone = 'neutral', ...rest }: AlertProps) {
  return (
    <div className={`alert alert--${tone}`} role="status">
      <AlertBody tone={tone} {...rest} />
    </div>
  );
}

export function Toast({ tone = 'neutral', ...rest }: AlertProps) {
  return (
    <div className={`alert toast alert--${tone}`} role="alert">
      <AlertBody tone={tone} {...rest} />
    </div>
  );
}
