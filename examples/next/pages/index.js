import Head from "next/head";
import { colorEntries } from "@catppuccin/palette";
import { useState } from "react";

import { IBM_Plex_Sans } from "next/font/google";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-sans",
});

export default function Home() {
  const [theme, setTheme] = useState("mocha");

  return (
    <>
      <Head>
        <title>Catppuccin + TailwindCSS!</title>
      </Head>
      <main
        className={`bg-base min-h-screen w-full text-text font-sans transition-colors duration-1000 ${plex.variable} ${theme}`}
      >
        <div className="container max-w-xl mx-auto space-y-2">
          <div className="space-y-2 text-center pt-8">
            <img
              className="mx-auto"
              src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png"
              width="100"
              alt="Logo"
            />
            <h1>Catppuccin for Tailwind CSS</h1>
            <span className="mocha macchiato frappe latte"></span>
            <div className="flex max-w-fit border rounded overflow-hidden border-surface2 items-center mx-auto">
              <span className="rounded-l whitespace-nowrap px-2">
                Current flavour:
              </span>
              <select
                className="focus:rounded-r focus:ring-pink focus:border-pink bg-crust border-none w-full p-1"
                name="colorscheme"
                onChange={(e) => setTheme(e.target.value.toLowerCase())}
              >
                <option>Mocha</option>
                <option>Macchiato</option>
                <option>Frappe</option>
                <option>Latte</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-8 sm:grid-cols-1 pb-4">
            {colorEntries.map(([colorName]) => (
              <div className="2xl:contents" key={colorName}>
                <p className="text-sm font-semibold 2xl:col-end-1 2xl:pt-2.5">
                  {colorName}
                </p>
                <div className="grid mt-3 grid-cols-1 sm:grid-cols-11 gap-y-3 gap-x-2 sm:mt-2 2xl:mt-0">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                    (shade) => (
                      <div className="relative flex" key={colorName + shade}>
                        <div className="flex items-center gap-x-3 w-full cursor-pointer sm:block sm:space-y-1.5">
                          <div
                            className={`bg-${colorName}-${shade} h-10 w-10 rounded dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full`}
                          ></div>
                          <div className="px-0.5">
                            <span>{shade}</span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
