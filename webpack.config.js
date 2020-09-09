const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader"
          }
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        minifyCSS: true,
        minifyURLs: true,
        minifyJS: true
      }
    }),
  ],
};
