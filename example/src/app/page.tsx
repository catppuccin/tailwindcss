"use client";

import { useState } from "react";
import { CtpFlavors } from "@catppuccin/palette";

import ShowcaseShades from "@/components/ShowcaseShades";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/lib/cn";

const slugify = (str: string) => str.toLowerCase().replace(/\s/g, "-");

const Header = (
  { title, level = 1 }: {
    title: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
  },
) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag id={slugify(title)} className="flex">
      <a
        href={`#${slugify(title)}`}
        className="group relative border-none lg:-ml-2 lg:pl-2"
      >
        <div className="absolute -ml-8 hidden items-center border-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 lg:flex">
          <div className="flex h-6 w-6 items-center justify-center rounded-md text-blue shadow-sm ring-1 ring-slate-900/5 hover:shadow hover:ring-slate-900/10">
            <svg width="12" height="12" fill="none" aria-hidden="true">
              <path
                d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              >
              </path>
            </svg>
          </div>
        </div>
        {title}
      </a>
    </Tag>
  );
};

export default function Home() {
  const [theme, setTheme] = useState<keyof CtpFlavors>("mocha");

  return (
    <main
      className={cn(
        "bg-base min-h-screen w-full text-text font-sans transition-colors",
        theme,
      )}
    >
      <div className="text-center sticky top-0 bg-gradient-to-b from-base/90 to-base/75 shadow backdrop-blur z-10 transition-colors">
        <div className="container max-w-xl mx-auto space-y-2 py-4">
          <div className="gap-2 flex items-center justify-center">
            <img
              className="w-8 h-8 sm:h-10 sm:w-10"
              src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png"
              alt="Catppuccin"
            />
            <h1 className="font-bold text-lg">
              Catppuccin for{" "}
              <a
                href="https://tailwindcss.com"
                className="text-blue hover:text-sky focus:text-sky items-center"
                tabIndex={0}
              >
                Tailwind CSS
              </a>
            </h1>
          </div>
        </div>
      </div>
      <div className="container max-w-xl mx-auto px-2">
        <Header title="Shades" level={2} />
        <ShowcaseShades />
      </div>
      <div className="sticky bottom-0 transition-colors bg-gradient-to-t from-base/90 to-base/75 shadow-inner backdrop-blur z-10">
        <div className="max-w-xl mx-auto">
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </main>
  );
}
