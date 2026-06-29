import figma from "@figma/code-connect";
import { Pagination } from "@/components/ui";

/**
 * Figma "Page Item" (State variant set, per-page) → <Pagination> container in components/ui.
 * node-id 52-12 · CTOC Design System
 */
figma.connect(
  Pagination,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=52-12",
  {
    example: () => <Pagination page={1} pageCount={12} onPage={() => {}} />,
  }
);
