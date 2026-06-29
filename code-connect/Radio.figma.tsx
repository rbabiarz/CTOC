import figma from "@figma/code-connect";
import { Radio } from "@/components/ui";

/**
 * Figma "Radio" (State variant set) → <Radio> in components/ui.
 * node-id 32-13 · CTOC Design System
 */
figma.connect(
  Radio,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=32-13",
  {
    props: {
      checked: figma.enum("State", { Selected: true, Unselected: false, Disabled: false }),
      disabled: figma.enum("State", { Disabled: true, Selected: false, Unselected: false }),
    },
    example: ({ checked, disabled }) => (
      <Radio name="severity" label="P1 critical" checked={checked} disabled={disabled} />
    ),
  }
);
