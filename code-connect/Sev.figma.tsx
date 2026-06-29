import figma from "@figma/code-connect";
import { Sev } from "@/components/ui";

/**
 * Figma "Severity Badge" (Level variant set) → <Sev> in components/ui.
 * node-id 18-17 · CTOC Design System
 */
figma.connect(
  Sev,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=18-17",
  {
    props: {
      level: figma.enum("Level", {
        Critical: "critical",
        High: "high",
        Medium: "medium",
        Low: "low",
        Resolved: "resolved",
      }),
    },
    example: ({ level }) => <Sev level={level} />,
  }
);
