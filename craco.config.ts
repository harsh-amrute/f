/* craco.config.ts */
import type { Configuration, RuleSetRule, RuleSetUseItem } from "webpack";
import * as path from "path";
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Narrower object-shape used by webpack for loader entries
type UseItemWithLoader = {
  ident?: string;
  loader?: string;
  options?: string | { [index: string]: any };
};

function isUseItemWithLoader(u: RuleSetUseItem): u is UseItemWithLoader {
  return typeof u === "object" && u !== null && "loader" in u;
}

module.exports = {
  webpack: {
    plugins: {
      add: [new VanillaExtractPlugin()],
    },
    // alias: {
    //   "style-inject": path.resolve(__dirname, "src/noop-style-inject.js"),
    // },
    configure: (webpackConfig: Configuration): Configuration => {
      const rules = (webpackConfig.module?.rules ?? []) as RuleSetRule[];

      const oneOfRule = rules.find((r) => Array.isArray((r as any).oneOf));
      const oneOf = ((oneOfRule as any)?.oneOf ?? []) as RuleSetRule[];

      oneOf.forEach((rule) => {
        if (Array.isArray(rule.use)) {
          rule.use = rule.use.map((u: RuleSetUseItem): RuleSetUseItem => {
            // style-loader as a bare string
            if (typeof u === "string") {
              return u.includes("style-loader")
                ? { loader: MiniCssExtractPlugin.loader }
                : u;
            }
            // style-loader as an object
            if (isUseItemWithLoader(u) && typeof u.loader === "string" && u.loader.includes("style-loader")) {
              return {
                ...u,
                loader: MiniCssExtractPlugin.loader,
                options: { esModule: true }, // options type is compatible
              };
            }
            return u;
          });
        }
      });

      webpackConfig.plugins = webpackConfig.plugins || [];
      webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[id].[contenthash:8].css",
        })
      );

      return webpackConfig;
    },
  },
};

export {};
