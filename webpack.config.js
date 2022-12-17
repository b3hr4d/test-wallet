const path = require("path")
const version = require("./package.json").version
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { DefinePlugin, ProvidePlugin } = require("webpack")

const config = {
  entry: {
    home: "./src/index.tsx",
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: `bundle.${version}.js`,
    clean: true,
  },
  devServer: {
    static: "./dist/main",
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(png|jpg|svg)$/, loader: "url-loader" },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      buffer: require.resolve("buffer"),
    },
  },
  plugins: [
    new DefinePlugin({
      process: { env: {} },
    }),
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}

module.exports = (env, argv) => {
  if (env.WEBPACK_SERVE) config.devtool = "source-map"
  if (argv.mode === "development") {
    config.output = {
      path: path.join(__dirname, "./dist"),
      filename: `bundle.${version}.js`,
      clean: true,
    }
  }

  const WEBPACK_DATA = new DefinePlugin({
    IS_DEV: JSON.stringify(argv.mode === "development"),
    APP_VERSION: JSON.stringify(version),
    IS_SERVE: JSON.stringify(env.WEBPACK_SERVE),
  })

  config.plugins.push(WEBPACK_DATA)

  return config
}
