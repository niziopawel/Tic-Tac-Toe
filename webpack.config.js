const webpack = require("webpack")
const path = require("path")
const webpackMerge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const modeConfig = (env) => require(`./build-utils/webpack.${env}`)()

module.exports = ({ mode } = { mode: "production" }) => {
  return webpackMerge(
    {
      mode,
      entry: "./src/js/index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          title: "Tic Tac Toe",
          filename: "index.html",
        }),
        new webpack.ProgressPlugin(),
      ],
    },
    modeConfig(mode)
  )
}
