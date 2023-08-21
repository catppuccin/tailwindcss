import path from "path";
import tailwind, { Config } from "tailwindcss";
import postcss from "postcss";
import CtpPlugin, { CatppuccinPluginOptions } from "../src";

export default function run(
  pluginConfig: Partial<CatppuccinPluginOptions> = {},
  twConfig: Config,
  plugin = tailwind
) {
  const { currentTestName } = expect.getState();

  twConfig = {
    ...{
      plugins: [CtpPlugin(pluginConfig)],
      corePlugins: { preflight: false },
    },
    ...twConfig,
  };
  const css = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `;

  return postcss(plugin(twConfig)).process(css, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
}
