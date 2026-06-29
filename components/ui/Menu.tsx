'use client';

import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

/* ===== Menu — trigger button + dropdown menu (Escape / outside-click to close) ===== */
interface MenuItemDef {
  label: ReactNode;
  onSelect?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

interface MenuProps {
  label: ReactNode;
  items: MenuItemDef[];
  ariaLabel?: string;
}

export function Menu({ label, items, ariaLabel }: MenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <div className="menu" ref={rootRef}>
      <button
        type="button"
        className="menu__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        {label} <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="menu__list" role="menu">
          {items.map((it, i) => (
            <li key={i} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={it.disabled}
                className={`menu__item ${it.danger ? 'menu__item--danger' : ''}`.trim()}
                onClick={() => { it.onSelect?.(); setOpen(false); }}
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
