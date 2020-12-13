const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const styleTypes = /\.(css|less|styl|scss|sass|sss)$/;
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
  output: {
    filename: "[name].js",
    chunkFilename: "[id].js",
    path: path.resolve(__dirname, "../build/dist/"),
    publicPath: "/dist/"
  },
  entry: {
    home: path.resolve(__dirname, "../Client/pages/home/index.js"),
    blog: path.resolve(__dirname, "../Client/pages/blog/index.js")
  },
  module: {
    rules: [
      {
        test: styleTypes,
        rules: [
          {
            issuer: { not: [styleTypes] },
            use: "isomorphic-style-loader",
            sideEffects: true
          },
          {
            test: styleTypes,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader"
            ],
            sideEffects: true
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      }
    ]
  },
  optimization: {
    usedExports: true,
    moduleIds: "hashed",
    runtimeChunk: "single",
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: false
          }
        },
        parallel: true,
        cache: true
      }),
      new OptimizeCssAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]src[\\/]components[\\/]/,
          chunks: "all",
          minSize: 0
        }
      }
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin({ analyzerPort: 9999 }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      React: "react"
    }),
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      modules: path.join(__dirname, "node_modules")
    }
  }
};
