import figma from "@figma/code-connect";
import { Alert } from "@/components/ui";

/**
 * Figma "Alert" (Severity variant set) → <Alert> in components/ui.
 * node-id 40-19 · CTOC Design System
 */
figma.connect(
  Alert,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=40-19",
  {
    props: {
      tone: figma.enum("Severity", {
        Critical: "critical",
        Warning: "warning",
        Success: "success",
        Info: "info",
      }),
    },
    example: ({ tone }) => (
      <Alert tone={tone} title="APT-441 lateral movement">
        DC-01 compromised — containment running.
      </Alert>
    ),
  }
);
