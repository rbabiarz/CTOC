import figma from "@figma/code-connect";
import { Panel } from "@/components/ui";

/**
 * Figma "Panel / Card" → <Panel> in components/ui.
 * node-id 21-2 · CTOC Design System
 */
figma.connect(
  Panel,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=21-2",
  {
    example: () => (
      <Panel title="ALERT QUEUE" sub="newest first · click to triage" flush>
        <table className="tbl">{/* rows */}</table>
      </Panel>
    ),
  }
);
