import getPlugins from "./config/plugins";
import getEntry from "./config/entry";
import rules from "./config/rules";
import { inDevelopment } from "./envs";
import { currentDirectory, publicAssets } from "./config/paths";

//= =============================================================================//
// WEBPACK DEVELOPMENT & PRODUCTION CONFIGS                                      /
//= =============================================================================//

const chunkOptions = !inDevelopment
  ? {
      minSize: 60000,
      maxSize: 250000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  : {};

module.exports = {
  mode: inDevelopment ? "development" : "production",
  devtool: inDevelopment ? "cheap-module-source-map" : "hidden-source-map",
  context: currentDirectory,
  entry: getEntry(),
  optimization: {
    // runtimeChunk: "single",
    splitChunks: {
      // Auto split vendor modules in production only
      chunks: inDevelopment ? "async" : "all",
      ...chunkOptions
    }
  },
  output: {
    path: publicAssets,
    publicPath: "/assets/",
    // Don't use chunkhash in development it will increase compilation time
    filename: inDevelopment ? "[name].js" : "[name].[chunkhash:8].js",
    chunkFilename: inDevelopment
      ? "[id].chunk.js"
      : "[name].[chunkhash:8].chunk.js",
    pathinfo: inDevelopment
  },
  module: { rules },
  plugins: getPlugins(),
  /* Advanced configuration */
  resolveLoader: {
    // Use loaders without the -loader suffix
    moduleExtensions: ["-loader"]
  },
  resolve: {
    modules: ["src", "node_modules"],
    descriptionFiles: ["package.json"],
    extensions: [".js", ".jsx", ".json", ".scss"]
  },
  cache: inDevelopment,
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: "empty",
    vm: "empty",
    net: "empty",
    tls: "empty"
  }
};
