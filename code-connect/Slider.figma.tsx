import figma from "@figma/code-connect";
import { Slider } from "@/components/ui";

/**
 * Figma "Slider" (State variant set) → <Slider> in components/ui.
 * node-id 58-30 · CTOC Design System
 */
figma.connect(
  Slider,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=58-30",
  {
    props: {
      disabled: figma.enum("State", { Disabled: true, Default: false, Focus: false }),
    },
    example: ({ disabled }) => (
      <Slider label="Confidence threshold" showValue min={0} max={100} defaultValue={80} disabled={disabled} />
    ),
  }
);
