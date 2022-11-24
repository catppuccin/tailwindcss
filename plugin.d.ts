export type CatppuccinFlavour = "latte" | "frappe" | "macchiato" | "mocha";
export type CatppuccinColour =
  | "rosewater"
  | "flamingo"
  | "pink"
  | "mauve"
  | "red"
  | "maroon"
  | "peach"
  | "yellow"
  | "green"
  | "teal"
  | "sky"
  | "sapphire"
  | "blue"
  | "lavender"
  | "surface2"
  | "subtext0"
  | "subtext1"
  | "overlay0"
  | "overlay2"
  | "surface0"
  | "text"
  | "overlay1"
  | "surface1"
  | "base"
  | "mantle"
  | "crust";

export type CatppuccinPluginOptions = {
  prefix?: string | boolean;
  defaultFlavour?: CatppuccinFlavour;
};

export type WithOpacityFn = (options: {
  opacityValue: number | undefined;
}) => string;
