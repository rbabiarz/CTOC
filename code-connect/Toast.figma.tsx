import figma from "@figma/code-connect";
import { Toast } from "@/components/ui";

/**
 * Figma "Toast" (Severity variant set) → <Toast> in components/ui.
 * node-id 39-30 · CTOC Design System
 */
figma.connect(
  Toast,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=39-30",
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
      <Toast tone={tone} onDismiss={() => {}}>
        Wire hold cleared — L-7811 released.
      </Toast>
    ),
  }
);
