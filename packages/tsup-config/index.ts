import fs from "fs";
import path from "path";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import type { Options } from "tsup";

const config: Options = {
  dts: true,
  format: ["cjs", "esm"],
  inject: ["../tsup-config/react-import.js"],
  external: ["react", "react-dom", "@measured/puck"],
  esbuildPlugins: [
    {
      name: "css-module",
      setup(build): void {
        // Resolve .module.css files
        build.onResolve(
          { filter: /\.module\.css$/, namespace: "file" },
          (args) => ({
            path: `${path.join(args.resolveDir, args.path)}#css-module`,
            namespace: "css-module",
            pluginData: {
              pathDir: path.join(args.resolveDir, args.path),
            },
          })
        );

        // Load .module.css files and process them with PostCSS and postcss-modules
        build.onLoad(
          { filter: /#css-module$/, namespace: "css-module" },
          async (args) => {
            const { pluginData } = args as { pluginData: { pathDir: string } };
            const source = fs.readFileSync(pluginData.pathDir, "utf8");

            let cssModule = {};
            const result = await postcss([
              postcssModules({
                getJSON(_, json) {
                  cssModule = json;
                },
              }),
            ]).process(source, { from: pluginData.pathDir });

            return {
              pluginData: { css: result.css },
              contents: `import "${pluginData.pathDir}"; export default ${JSON.stringify(cssModule)};`,
            };
          }
        );

        // Resolve processed .module.css files for CSS content
        build.onResolve(
          { filter: /\.module\.css$/, namespace: "css-module" },
          (args) => ({
            path: path.join(args.resolveDir, args.path, "#css-module-data"),
            namespace: "css-module",
            pluginData: args.pluginData as { css: string },
          })
        );

        // Load and return CSS content for .module.css files
        build.onLoad(
          { filter: /#css-module-data$/, namespace: "css-module" },
          (args) => ({
            contents: (args.pluginData as { css: string }).css,
            loader: "css",
          })
        );
      },
    },
  ],
};

export default config;
