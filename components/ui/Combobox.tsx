'use client';

import { useState, useRef, useEffect, useId } from 'react';

/* ===== Combobox — filterable single-select with listbox + keyboard nav ===== */
interface ComboOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export function Combobox({ options, value, onChange, placeholder, ariaLabel, disabled }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);
  const display = open ? query : selected?.label ?? '';
  const filtered = query.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const choose = (o: ComboOption) => {
    onChange(o.value);
    setQuery('');
    setOpen(false);
  };

  return (
    <div className="combobox" ref={rootRef}>
      <input
        className="input combobox__input"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-label={ariaLabel}
        disabled={disabled}
        placeholder={placeholder}
        value={display}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((a) => Math.min(filtered.length - 1, a + 1)); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
          else if (e.key === 'Enter') { if (open && filtered[active]) { e.preventDefault(); choose(filtered[active]); } }
          else if (e.key === 'Escape') { setOpen(false); }
        }}
      />
      <span className="combobox__chev" aria-hidden="true">▾</span>
      {open && filtered.length > 0 && (
        <ul className="combobox__list" id={listId} role="listbox">
          {filtered.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`combobox__opt ${i === active ? 'is-active' : ''} ${o.value === value ? 'is-selected' : ''}`.trim()}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => { e.preventDefault(); choose(o); }}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
