import plugin from "tailwindcss/plugin";
import { Config } from "tailwindcss";
import { ThemeConfig } from "tailwindcss/types/config";

import { colorEntries, CtpFlavors, flavorEntries } from "@catppuccin/palette";
import { generateShades } from "./shades";

type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

// generates the css variables, injected in the addBase() function
const generateColorCss = (
  options: CatppuccinPluginOptions,
): Record<string, Record<string, string>> => {
  return flavorEntries
    .map(([flavorName, colors]) => {
      // if a prefix is defined, use e.g. '.ctp-mocha' instead of '.mocha'
      let className = `.${options.prefix ?? ""}${flavorName}`;

      // if the current variant is defaultFlavor, add to ':root' instead
      if (options.defaultFlavor) {
        className = flavorName === options.defaultFlavor ? ":root" : className;
        console.log("Setting default flavor", className);
      }

      return {
        [className]: colorEntries
          .map(([colorName]) => {
            const { r, g, b } = colors[colorName].rgb;
            const shades = generateShades([r, g, b]);
            return Object.entries(shades).reduce((acc, [shade, value]) => {
              const keyName =
                shade === "500" ? colorName : `${colorName}-${shade}`;
              return { ...acc, [`--ctp-${keyName}`]: value };
            }, {});
          })
          .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

// generates the 'options' mapping in tailwind.config.js
// this extends the theme & adds the names of the colors
const generateOptions = (
  options: CatppuccinPluginOptions,
): Record<string, Record<string, string>> => {
  return colorEntries
    .map(([colorName, variants]) => {
      const keyName = `${options.prefix ?? ""}${colorName}`;

      const fallbackFlavor: keyof CtpFlavors =
        typeof options.defaultFlavor === "string"
          ? options.defaultFlavor
          : "mocha";

      const { r, g, b } = variants[fallbackFlavor].rgb;
      const fallbackShades = generateShades([r, g, b]);

      return {
        [keyName]: {
          ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].reduce(
            (acc, shade) => {
              const keyName =
                shade === 500 ? colorName : `${colorName}-${shade}`;
              acc[
                shade
              ] = `rgb(var(--ctp-${keyName}, ${fallbackShades[shade]}) / <alpha-value>)`;
              return acc;
            },
            {} as Record<number, string>,
          ),
          DEFAULT: `rgb(var(--ctp-${colorName}, ${fallbackShades[500]}) / <alpha-value>)`,
        },
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

// every color key available in tailwindcss
const colorConfigKeys: (keyof PickByType<
  ThemeConfig,
  ThemeConfig["colors"]
>)[] = [
  "backgroundColor",
  "borderColor",
  "caretColor",
  "colors",
  "divideColor",
  "fill",
  "gradientColorStops",
  "placeholderColor",
  "ringColor",
  "ringOffsetColor",
  "stroke",
  "textColor",
];

export type CatppuccinPluginOptions = {
  defaultFlavor?: keyof CtpFlavors;
  generateShades?: boolean;
  prefix?: string;
};
const defaultOptions: CatppuccinPluginOptions = {
  defaultFlavor: undefined,
  generateShades: true,
  prefix: undefined,
};

export default plugin.withOptions<Partial<CatppuccinPluginOptions>>(
  (options) => {
    return ({ addComponents }) => {
      addComponents(generateColorCss({ ...defaultOptions, ...options }));
    };
  },
  (options) => {
    const extendOption: Partial<ThemeConfig> = {};
    colorConfigKeys.map((key) => {
      extendOption[key] = generateOptions({ ...defaultOptions, ...options });
    });

    const config: Partial<Config> = {
      theme: { extend: extendOption },
    };

    return config;
  },
);
