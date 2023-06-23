import plugin from "tailwindcss/plugin";
import { variants } from "@catppuccin/palette";
import { Config } from "tailwindcss";
import { ThemeConfig } from "tailwindcss/types/config";

type CatppuccinFlavor = keyof typeof variants;
type CatppuccinColor = keyof (typeof variants)[CatppuccinFlavor];
type CatppuccinPluginOptions = {
  prefix?: string | boolean;
  defaultFlavour?: CatppuccinFlavor;
};
type WithOpacityFn = (options: { opacityValue?: number }) => string;
type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

// helper function for css values + opacity in tailwind < 3.1
const withOpacity = (variableName: string) => {
  return ({ opacityValue }: { opacityValue?: number }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
};

// generate an object with the catppuccin palette
const palette: Record<string, Record<string, string>> = {};
Object.keys(variants).map((variant) => {
  // insert a key into the colors object, with an empty object
  palette[variant] = {};
  // for each color...
  Object.keys(variants[variant as CatppuccinFlavor]).map((color) => {
    // insert a key into the colors object
    palette[variant][color] =
      variants[variant as CatppuccinFlavor][color as CatppuccinColor].hex;
  });
});

// two constants keeping track of the names of the variants & colors
const flavors = Object.keys(palette);
const colors = Object.keys(palette[flavors[0]]);

// converts '#000000' to '0, 0, 0' for the css variables
const parseHexToRGB = (hex: string): string => {
  const hexColor = hex.replace("#", "");
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

// generates the css variables, injected in the addBase() function
const generateColorCss = (
  defaultFlavor: CatppuccinFlavor | "" = "",
  prefix: string | boolean = false
) => {
  const result: Record<string, Record<string, string>> = {};

  flavors.map((variant) => {
    // if a prefix is defined, use e.g. '.ctp-mocha' instead of '.mocha'
    const className = prefix ? `.${prefix}-${variant}` : `.${variant}`;

    // if the current variant is defaultFlavor, add to ':root'
    const keyName = variant === defaultFlavor ? ":root" : className;

    result[keyName] = {};
    colors.map((color) => {
      result[keyName][`--ctp-${color}`] = parseHexToRGB(
        palette[variant][color]
      );
    });
  });

  return result;
};

// generates the 'options' mapping in tailwind.config.js
// this extends the theme & adds the names of the colors
const generateOptions = (prefix: string | boolean = false) => {
  const result: Record<string, { DEFAULT: WithOpacityFn }> = {};

  colors.map((color) => {
    const keyName = prefix ? `${prefix}-${color}` : color;
    // withOpacity is used to provide backward compatibility with Tailwind < 3.1
    result[keyName] = { DEFAULT: withOpacity(`--ctp-${color}`) };
  });

  return result;
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

export default plugin.withOptions<CatppuccinPluginOptions>(
  (options) => {
    return ({ addBase }) => {
      addBase(generateColorCss(options?.defaultFlavour, options?.prefix));
    };
  },
  (options) => {
    // generate the options mapping
    const extendOption: Partial<ThemeConfig> = {};

    colorConfigKeys.map((key) => {
      extendOption[key] = generateOptions(options?.prefix);
    });

    const config: Config = {
      content: [],
      theme: {
        extend: extendOption,
      },
    };

    return config;
  }
);
