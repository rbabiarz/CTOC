import figma from "@figma/code-connect";
import { Avatar } from "@/components/ui";

/**
 * Figma "Avatar" (Size × Type variant set) → <Avatar> in components/ui.
 * The code Avatar renders an initials monogram (Figma Type=Initials).
 * node-id 51-18 · CTOC Design System
 */
figma.connect(
  Avatar,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=51-18",
  {
    props: {
      size: figma.enum("Size", { Small: "sm", Medium: "md", Large: "lg" }),
    },
    example: ({ size }) => <Avatar name="M. Okafor" size={size} />,
  }
);
