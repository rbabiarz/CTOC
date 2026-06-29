import figma from "@figma/code-connect";
import { Combobox } from "@/components/ui";

/**
 * Figma "Combobox" (State variant set) → <Combobox> in components/ui.
 * node-id 34-15 · CTOC Design System
 */
figma.connect(
  Combobox,
  "https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System?node-id=34-15",
  {
    props: {
      disabled: figma.enum("State", { Disabled: true, Default: false, Focus: false }),
    },
    example: ({ disabled }) => (
      <Combobox
        options={[
          { value: "edr", label: "EDR / Carbon Black" },
          { value: "ndr", label: "NDR / Vectra" },
        ]}
        value="edr"
        onChange={() => {}}
        placeholder="Detection source…"
        disabled={disabled}
      />
    ),
  }
);
