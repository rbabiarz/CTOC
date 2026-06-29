import figma from "@figma/code-connect";
import { StatusDot } from "@/components/ui";

/**
 * Figma "Status Dot" (State variant set) → <StatusDot> in components/ui.
 * node-id 22-14 · CTOC Design System
 */
figma.connect(
  StatusDot,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=22-14",
  {
    props: {
      tone: figma.enum("State", {
        Open: "critical",
        Triage: "warn",
        Contained: "ok",
        Resolved: "ok",
      }),
      label: figma.enum("State", {
        Open: "OPEN",
        Triage: "TRIAGE",
        Contained: "CONTAINED",
        Resolved: "RESOLVED",
      }),
    },
    example: ({ tone, label }) => <StatusDot tone={tone}>{label}</StatusDot>,
  }
);
