import figma from "@figma/code-connect";
import { Switch } from "@/components/ui";

/**
 * Figma "Switch" (State variant set) → <Switch> in components/ui.
 * node-id 32-27 · CTOC Design System
 */
figma.connect(
  Switch,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=32-27",
  {
    props: {
      checked: figma.enum("State", { On: true, Off: false, Disabled: false }),
      disabled: figma.enum("State", { Disabled: true, On: false, Off: false }),
    },
    example: ({ checked, disabled }) => (
      <Switch label="Live stream" checked={checked} disabled={disabled} />
    ),
  }
);
