import figma from "@figma/code-connect";
import { Breadcrumbs } from "@/components/ui";

/**
 * Figma "Breadcrumb Item" (Type variant set, per-item) → <Breadcrumbs> container in components/ui.
 * node-id 49-10 · CTOC Design System
 */
figma.connect(
  Breadcrumbs,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=49-10",
  {
    example: () => (
      <Breadcrumbs
        items={[
          { label: "OPS", href: "#" },
          { label: "Incidents", href: "#" },
          { label: "INC-9978", current: true },
        ]}
      />
    ),
  }
);
