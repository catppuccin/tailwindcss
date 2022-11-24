// const plugin = require("tailwindcss/plugin");
import * as plugin from "tailwindcss/plugin";
import { variants } from "@catppuccin/palette";
import { Config } from "tailwindcss";
import { ThemeConfig } from "tailwindcss/types/config";
import {
  CatppuccinColour,
  CatppuccinFlavour,
  CatppuccinPluginOptions,
  WithOpacityFn,
} from "./plugin.d";

// helper function for css values + opacity in tailwind < 3.1
const withOpacity = (variableName: string) => {
  return ({ opacityValue }: { opacityValue: number | undefined }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
};

// generate an object with the catppuccin palette
const palette: Record<string, Record<string, string>> = {};
Object.keys(variants).map((variant) => {
  // insert a key into the colours object, with an empty object
  palette[variant] = {};
  // for each colour...
  Object.keys(variants[variant as CatppuccinFlavour]).map((colour) => {
    // insert a key into the colours object
    palette[variant][colour] =
      variants[variant as CatppuccinFlavour][colour as CatppuccinColour].hex;
  });
});

// two constants keeping track of the names of the variants & colours
const flavours = Object.keys(palette);
const colours = Object.keys(palette[flavours[0]]);

// converts '#000000' to '0, 0, 0' for the css variables
const parseHexToRGB = (hex: string) => {
  // get the colour, drop the '#' if it's there
  const hexColour = hex.replace("#", "");
  // convert the colour to r g,b in base 10
  const r = parseInt(hexColour.substring(0, 2), 16);
  const g = parseInt(hexColour.substring(2, 4), 16);
  const b = parseInt(hexColour.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

// generates the css variables, injected in the addBase() function
const generateColorCss = (
  defaultFlavour = "",
  prefix: string | boolean = false
) => {
  const result: Record<string, Record<string, string>> = {};
  flavours.map((variant) => {
    // if a prefix is defined, use e.g. '.ctp-mocha' instead of '.mocha'
    const className = prefix ? `.${prefix}-${variant}` : `.${variant}`;

    // if the current variant is defaultFlavour, add to ':root'
    const keyName = variant === defaultFlavour ? ":root" : className;

    result[keyName] = {};
    colours.map((colour) => {
      result[keyName][`--ctp-${colour}`] = parseHexToRGB(
        palette[variant][colour]
      );
    });
  });
  return result;
};

// generates the 'options' mapping in tailwind.config.js
// this extends the theme & adds the names of the colours
const generateOptions = (prefix: string | boolean = false) => {
  const result: Record<string, WithOpacityFn> = {};
  colours.map((colour) => {
    const keyName = prefix ? `${prefix}-${colour}` : colour;
    // withOpacity is used to provide backward compatibility with Tailwind < 3.1
    result[keyName] = withOpacity(`--ctp-${colour}`);
  });
  return result;
};

// every colour key available in tailwindcss
const colourConfigKeys: Array<keyof ThemeConfig> = [
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

export default plugin.withOptions(
  (options: CatppuccinPluginOptions) => {
    return ({ addBase }) => {
      addBase(generateColorCss(options?.defaultFlavour, options?.prefix));
    };
  },
  (options) => {
    // generate the options mapping
    const extendOption: Partial<ThemeConfig> = {};
    colourConfigKeys.map((key) => {
      extendOption[key] = generateOptions(options.prefix);
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
