import { colors as labels, flavors as variants } from "@catppuccin/palette";
import ctpPlugin, { CatppuccinPluginOptions } from "../src";
import run from "./run";

const twColorOptions = [
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
const twColorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const colors = Object.keys(labels);
const flavors = Object.keys(variants);

const options: Record<string, Partial<CatppuccinPluginOptions>> = {
  default: {},
  minimalist: {
    defaultFlavor: "mocha",
    generateShades: false,
    prefix: false,
  },
  prefix: {
    prefix: "ctp",
  },
};

const commonTests = (plugin: ReturnType<typeof ctpPlugin>) => {
  // plugin extends the theme with the correct keys
  expect(Object.keys(plugin.config?.theme?.extend ?? {})).toStrictEqual(
    twColorOptions
  );

  // plugin extends the theme with the correct colors
  twColorOptions.map((mapping) => {
    expect(
      Object.keys(plugin.config?.theme?.extend?.[mapping] ?? {})
    ).toStrictEqual(colors);
  });
};

test("Import without options", () => {
  const plugin = ctpPlugin(options.default);
  commonTests(plugin);
  run(options.default, {
    content: [],
    theme: {
      colors: {},
    },
    safelist: [{ pattern: /bg-[\w\d]+-\d{2,3}/g }, ...flavors],
  }).then((result) => {
    console.log(result.css);
    result.root.walkRules((rule) => {
      if (rule.selector === ":root" || flavors.includes(rule.selector)) {
        // collect all the css variable names
        const decls: string[] = [];
        rule.walkDecls((decl) => {
          decls.push(decl.prop);
        });

        expect(decls).toStrictEqual(
          colors
            .map((color) =>
              twColorShades.map((shade) => `--ctp-${color}-${shade}`)
            )
            .flat()
        );
      }
    });
  });
});

test("Import with minimalist options", () => {
  const plugin = ctpPlugin(options.minimalist);
  commonTests(plugin);
});
