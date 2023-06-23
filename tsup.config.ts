import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  dts: true,
  format: "cjs",
  target: "node16",
  esbuildOptions: (options) => {
    options.footer = {
      // https://github.com/evanw/esbuild/issues/1182#issuecomment-1011414271
      js: "module.exports = module.exports.default;",
    };
  },
});
