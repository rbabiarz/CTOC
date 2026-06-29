import figma from "@figma/code-connect";
import { Tabs } from "@/components/ui";

/**
 * Figma "Tabs" (Selected variant set, per-tab) → <Tabs> container in components/ui.
 * node-id 23-21 · CTOC Design System
 */
figma.connect(
  Tabs,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=23-21",
  {
    example: () => (
      <Tabs
        items={[
          { id: "overview", label: "Overview" },
          { id: "signals", label: "Signals" },
          { id: "timeline", label: "Timeline" },
        ]}
        value="overview"
        onChange={() => {}}
      />
    ),
  }
);
