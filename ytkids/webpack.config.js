const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/dist"),
    publicPath: "dist",
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      "fs": false
    },
  },
};