import figma from "@figma/code-connect";
import { Tag } from "@/components/ui";

const URL =
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=19-6";

/**
 * Figma "Tag / Chip" (State variant set) → <Tag> in components/ui.
 * Two connects because the code component changes element by interactivity:
 * a static tag renders a <span>; an interactive one (onClick) renders a <button>.
 * node-id 19-6 · CTOC Design System
 */
figma.connect(Tag, URL, {
  variant: { State: "Default" },
  example: () => <Tag>STAGE 6/7</Tag>,
});

figma.connect(Tag, URL, {
  variant: { State: "Active" },
  example: () => <Tag onClick={() => {}}>LIVE</Tag>,
});
