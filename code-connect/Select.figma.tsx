import figma from "@figma/code-connect";
import { Select } from "@/components/ui";

/**
 * Figma "Select" (State variant set) → <Select> in components/ui.
 * node-id 33-16 · CTOC Design System
 */
figma.connect(
  Select,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=33-16",
  {
    props: {
      disabled: figma.enum("State", { Disabled: true, Default: false, Focus: false }),
    },
    example: ({ disabled }) => (
      <Select disabled={disabled}>
        <option>EDR / Carbon Black</option>
        <option>NDR / Vectra</option>
      </Select>
    ),
  }
);
