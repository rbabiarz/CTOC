import figma from "@figma/code-connect";
import { KPI } from "@/components/ui";

/**
 * Figma "KPI" (Accent variant set) → <KPI> in components/ui.
 * node-id 20-10 · CTOC Design System
 */
figma.connect(
  KPI,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=20-10",
  {
    props: {
      // Figma "Accent" → code `accent`; "Default" maps to no accent.
      accent: figma.enum("Accent", { Critical: "crit" }),
    },
    example: ({ accent }) => (
      <KPI
        label="OPEN ALERTS"
        value="218"
        delta="+8%"
        deltaDir="up"
        footer="14-day avg 1,330"
        accent={accent}
      />
    ),
  }
);
