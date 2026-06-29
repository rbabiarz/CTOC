'use client';

import type { ReactNode } from 'react';

/* ===== Breadcrumbs ===== */
interface Crumb {
  label: ReactNode;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {items.map((c, i) => (
          <li key={i} className="breadcrumbs__item">
            {c.current || !c.href ? (
              <span aria-current={c.current ? 'page' : undefined}>{c.label}</span>
            ) : (
              <a href={c.href}>{c.label}</a>
            )}
            {i < items.length - 1 && <span className="breadcrumbs__sep" aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ===== Pagination — windowed page list with ellipses ===== */
interface PaginationProps {
  page: number;
  pageCount: number;
  onPage: (page: number) => void;
}

function buildPages(page: number, count: number): (number | 'gap-l' | 'gap-r')[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const items: (number | 'gap-l' | 'gap-r')[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(count - 1, page + 1);
  if (start > 2) items.push('gap-l');
  for (let i = start; i <= end; i++) items.push(i);
  if (end < count - 1) items.push('gap-r');
  items.push(count);
  return items;
}

export function Pagination({ page, pageCount, onPage }: PaginationProps) {
  const items = buildPages(page, pageCount);
  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__btn"
        disabled={page <= 1}
        aria-label="Previous page"
        onClick={() => onPage(page - 1)}
      >
        <span aria-hidden="true">◀</span>
      </button>
      {items.map((it) =>
        it === 'gap-l' || it === 'gap-r' ? (
          <span key={it} className="pagination__gap" aria-hidden="true">…</span>
        ) : (
          <button
            key={it}
            type="button"
            className={`pagination__btn ${it === page ? 'is-active' : ''}`.trim()}
            aria-current={it === page ? 'page' : undefined}
            aria-label={`Page ${it}`}
            onClick={() => onPage(it)}
          >
            {it}
          </button>
        )
      )}
      <button
        type="button"
        className="pagination__btn"
        disabled={page >= pageCount}
        aria-label="Next page"
        onClick={() => onPage(page + 1)}
      >
        <span aria-hidden="true">▶</span>
      </button>
    </nav>
  );
}
