import { colorEntries } from "@catppuccin/palette";

export default function ShowcaseShades() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-4 sm:grid-cols-1 pb-4">
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
                      className={`bg-${colorName}-${shade} h-10 w-10 border border-text/20 rounded dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full transition-colors`}
                    >
                    </div>
                    <div className="px-0.5 font-mono">
                      <span>{shade}</span>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
