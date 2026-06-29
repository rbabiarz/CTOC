import figma from "@figma/code-connect";
import { Dashboard } from "@/components/dashboard/Dashboard";

/**
 * Figma "App Shell" → <Dashboard> in components/dashboard.
 * The shell composition renders the Topbar + Sidebar chrome around the active screen.
 * node-id 77-2 · CTOC Design System
 */
figma.connect(
  Dashboard,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=77-2",
  {
    example: () => <Dashboard />,
  }
);
