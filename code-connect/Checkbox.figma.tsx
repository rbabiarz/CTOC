import figma from "@figma/code-connect";
import { Checkbox } from "@/components/ui";

/**
 * Figma "Checkbox" (State variant set) → <Checkbox> in components/ui.
 * node-id 31-20 · CTOC Design System
 */
figma.connect(
  Checkbox,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=31-20",
  {
    props: {
      checked: figma.enum("State", { Checked: true, Unchecked: false, Indeterminate: false, Disabled: false }),
      disabled: figma.enum("State", { Disabled: true, Checked: false, Unchecked: false, Indeterminate: false }),
    },
    example: ({ checked, disabled }) => (
      <Checkbox label="Auto-contain" checked={checked} disabled={disabled} />
    ),
  }
);
