const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = () => {
  const styleTypes = /\.(css|less|styl|scss|sass|sss)$/;

  return {
    name: "SSR",
    mode: "development",
    devtool: "source-map",
    context: path.join(__dirname, "./dist/"),
    entry: {
      main: path.join(__dirname, "../Server/index.js")
    },
    output: {
      path: path.join(__dirname, "../build"),
      filename: "server.js",
      publicPath: "/dist/"
    },
    target: "node",

    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    externals: nodeExternals({
      whitelist: /\.(sa|sc|c)ss$/
    }),
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        modules: path.join(__dirname, "node_modules"),
        fonts: path.resolve(__dirname, "Client/assets/fonts")
      }
    },
    plugins: [],
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: ["pug-loader"]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: styleTypes,
          rules: [
            {
              issuer: { not: [styleTypes] },
              use: "isomorphic-style-loader"
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                {
                  loader: "css-loader",
                  options: {
                    modules: false
                  }
                },
                "postcss-loader",
                "sass-loader"
              ]
            }
          ]
        },
      ]
    }
  };
};
