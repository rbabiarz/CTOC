import figma from "@figma/code-connect";
import { Btn } from "@/components/ui";

/**
 * Figma "Button" (Style × State variant set) → <Btn> in components/ui.
 * node-id 16-18 · CTOC Design System
 */
figma.connect(
  Btn,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=16-18",
  {
    props: {
      // Figma "Style" → code `variant`. "Default" maps to no variant (the base .btn).
      variant: figma.enum("Style", {
        Primary: "primary",
        Danger: "danger",
        Ghost: "ghost",
      }),
      // Figma "State" → the native `disabled` attribute (Btn spreads ButtonHTMLAttributes).
      disabled: figma.enum("State", { Disabled: true, Default: false }),
    },
    example: ({ variant, disabled }) => (
      <Btn variant={variant} size="xs" disabled={disabled}>
        DECLARE INCIDENT
      </Btn>
    ),
  }
);
