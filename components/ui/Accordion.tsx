'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

/* ===== Accordion — disclosure list (single or multiple open) ===== */
interface AccordionItemDef {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItemDef[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export function Accordion({ items, allowMultiple, defaultOpen = [] }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const toggle = (id: string) => {
    setOpen((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : allowMultiple
        ? [...prev, id]
        : [id]
    );
  };

  return (
    <div className="accordion">
      {items.map((it) => {
        const isOpen = open.includes(it.id);
        return (
          <div className="accordion__item" key={it.id}>
            <h3 className="accordion__heading">
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`acc-${it.id}`}
                id={`acc-h-${it.id}`}
                onClick={() => toggle(it.id)}
              >
                <span>{it.title}</span>
                <span className="accordion__chev" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
            </h3>
            <div
              className="accordion__panel"
              id={`acc-${it.id}`}
              role="region"
              aria-labelledby={`acc-h-${it.id}`}
              hidden={!isOpen}
            >
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
