import figma from "@figma/code-connect";
import { Menu } from "@/components/ui";

/**
 * Figma "Menu Item" (State variant set, per-item) → <Menu> container in components/ui.
 * node-id 48-18 · CTOC Design System
 */
figma.connect(
  Menu,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=48-18",
  {
    example: () => (
      <Menu
        label="ACTIONS"
        items={[
          { label: "Assign to me", onSelect: () => {} },
          { label: "Escalate", onSelect: () => {} },
          { label: "Dismiss", danger: true, onSelect: () => {} },
        ]}
      />
    ),
  }
);
