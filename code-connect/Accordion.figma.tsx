import figma from "@figma/code-connect";
import { Accordion } from "@/components/ui";

/**
 * Figma "Accordion Item" (State variant set, per-item) → <Accordion> container in components/ui.
 * node-id 50-16 · CTOC Design System
 */
figma.connect(
  Accordion,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=50-16",
  {
    example: () => (
      <Accordion
        items={[
          { id: "ctx", title: "Alert context", content: "Host, detector, confidence…" },
          { id: "sig", title: "Related signals", content: "5 correlated events in the last 30m." },
        ]}
      />
    ),
  }
);
