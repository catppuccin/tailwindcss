import React, { Dispatch, SetStateAction } from "react";
import { CtpFlavors } from "@catppuccin/palette";
import { cn } from "@/lib/cn";

import MochaIcon from "@/assets/1F33F.svg";
import MacchiatoIcon from "@/assets/1F33A.svg";
import FrappeIcon from "@/assets/1FAB4.svg";
import LatteIcon from "@/assets/1F33B.svg";

const flavors: Record<
  string,
  {
    name: string;
    className: keyof CtpFlavors;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
  }
> = {
  mocha: {
    name: "Mocha",
    className: "mocha",
    icon: MochaIcon,
  },
  macchiato: {
    name: "Macchiato",
    className: "macchiato",
    icon: MacchiatoIcon,
  },
  frappe: {
    name: "Frappé",
    className: "frappe",
    icon: FrappeIcon,
  },
  latte: {
    name: "Latte",
    className: "latte",
    icon: LatteIcon,
  },
};

export default function ThemeSwitcher({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: Dispatch<SetStateAction<keyof CtpFlavors>>;
}) {
  return (
    <div className="grid p-4 md:p-4 gap-4 md:gap-2 grid-cols-2 sm:grid-cols-4 place-items-stretch">
      {Object.values(flavors).map(({ name, icon, className }) => (
        <button
          key={className}
          className={cn(
            className,
            "rounded bg-base flex items-center justify-center py-1 px-2 border",
            {
              "border-surface2": theme !== className,
              "border-pink": theme === className,
            },
          )}
          onClick={() => setTheme(className)}
        >
          {React.createElement(icon, { className: "w-8 h-8" })}
          <span className="text-text">{name}</span>
        </button>
      ))}
    </div>
  );
}
