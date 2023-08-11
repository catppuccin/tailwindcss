import plugin from "tailwindcss/plugin";
import convert from "color-convert";
import { Config } from "tailwindcss";
import { ThemeConfig } from "tailwindcss/types/config";

import { colorEntries, CtpFlavors, flavorEntries } from "@catppuccin/palette";
import { generateShades } from "./shades";

type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

// generates the css variables, injected in the addBase() function
const generateColorCss = (
  options: CatppuccinPluginOptions
): Record<string, Record<string, string>> => {
  return flavorEntries
    .map(([flavorName, colors]) => {
      // if a prefix is defined, use e.g. '.ctp-mocha' instead of '.mocha'
      let className = options?.prefix
        ? `.${options.prefix}-${flavorName}`
        : `.${flavorName}`;

      // if the current variant is defaultFlavor, add to ':root'
      className = flavorName === options.defaultFlavor ? ":root" : className;

      return {
        [className]: colorEntries
          .map(([colorName]) => {
            const { r, g, b } = colors[colorName].rgb;
            const shades = generateShades([r, g, b]);
            return Object.entries(shades)
              .map(([shade, value]) => {
                return {
                  [`--ctp-${colorName}-${shade}`]: value,
                };
              })
              .reduce((acc, curr) => ({ ...acc, ...curr }), {});
          })
          .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

// generates the 'options' mapping in tailwind.config.js
// this extends the theme & adds the names of the colors
const generateOptions = (
  options: CatppuccinPluginOptions
): Record<string, Record<string, string>> => {
  return colorEntries
    .map(([colorName, variants]) => {
      const keyName = options?.prefix
        ? `${options.prefix}-${colorName}`
        : colorName;
      const fallback = convert.hex
        .rgb(variants[options.defaultFlavor].hex)
        .join(" ");

      return {
        [keyName]: {
          ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].reduce(
            (acc, shade) => {
              const { r, g, b } = variants[options.defaultFlavor].rgb;
              const fallback = generateShades([r, g, b])[shade];
              acc[
                shade
              ] = `rgb(var(--ctp-${colorName}-${shade}, ${fallback}) / <alpha-value>)`;
              return acc;
            },
            {} as Record<number, string>
          ),
          DEFAULT: `rgb(var(--ctp-${colorName}-500, ${fallback}) / <alpha-value>)`,
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
  defaultFlavor: keyof CtpFlavors;
  generateShades: boolean;
  prefix: string | boolean;
};
const defaultOptions: CatppuccinPluginOptions = {
  defaultFlavor: "mocha",
  generateShades: true,
  prefix: false,
};

export default plugin.withOptions<Partial<CatppuccinPluginOptions>>(
  (options) => {
    return ({ addBase }) => {
      addBase(generateColorCss({ ...defaultOptions, ...options }));
    };
  },
  (options) => {
    const extendOption: Partial<ThemeConfig> = {};
    colorConfigKeys.map((key) => {
      extendOption[key] = generateOptions({ ...defaultOptions, ...options });
    });

    const config: Partial<Config> = {
      theme: {
        extend: extendOption,
      },
    };

    return config;
  }
);
