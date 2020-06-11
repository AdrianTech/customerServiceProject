const path = require("path");
const nodeExternals = require("webpack-node-externals");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./server/app.ts",
  mode: NODE_ENV,
  target: "node",
  watch: NODE_ENV === "development",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "./server/build"),
    filename: "app.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      }
    ]
  }
};
