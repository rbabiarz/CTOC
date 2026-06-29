import figma from "@figma/code-connect";
import { Input } from "@/components/ui";

/**
 * Figma "Input" (State variant set) → <Input> in components/ui.
 * node-id 23-10 · CTOC Design System
 */
figma.connect(
  Input,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=23-10",
  {
    props: {
      invalid: figma.enum("State", { Error: true, Default: false, Focus: false, Disabled: false }),
      disabled: figma.enum("State", { Disabled: true, Default: false, Focus: false, Error: false }),
    },
    example: ({ invalid, disabled }) => (
      <Input placeholder="Search alerts…" invalid={invalid} disabled={disabled} />
    ),
  }
);
