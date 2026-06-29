import figma from "@figma/code-connect";
import { ClickableRow } from "@/components/ui";

/**
 * Figma "Table Row" (State variant set) → <ClickableRow> in components/ui.
 * Encapsulates the keyboard-accessible row pattern (tabindex / Enter / Space / aria-current).
 * node-id 36-45 · CTOC Design System
 */
figma.connect(
  ClickableRow,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=36-45",
  {
    props: {
      active: figma.enum("State", { Selected: true, Default: false, Hover: false }),
    },
    example: ({ active }) => (
      <ClickableRow active={active} ariaLabel="Open INC-9978" onActivate={() => {}}>
        <td className="mono">INC-9978</td>
        <td>Targeted intrusion · APT-441</td>
      </ClickableRow>
    ),
  }
);
