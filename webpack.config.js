const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
console.log(123123);
const config = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: `scripts/[name].js`,
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    alias: {
      "@styleguide/settings": path.resolve(
        __dirname,
        "./src/styleguide/settings/main.scss"
      ),
      "@functions": path.resolve(__dirname, "./src/functions"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@components": path.resolve(__dirname, "./src/components/core"),
      "@icons": path.resolve(
        __dirname,
        "./src/components/optional/Icon/assets"
      ),
      "@const": path.resolve(__dirname, "./src/const")
    }
  },
  optimization: {
    splitChunks: {
      name: "common",
      maxInitialRequests: Infinity,
      minSize: 1,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
          chunks: "all",
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ""
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "svg-inline-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "../"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
              publicPath: "../"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `styles/[name].css`
    }),
    process.env.BUNDLE_STATS ? new BundleAnalyzerPlugin() : undefined
  ].filter(Boolean),
  devtool:
    process.env.NODE_ENV === "development"
      ? "eval-cheap-module-source-map"
      : undefined,
  devServer: {
    host: "localhost",
    open: true,
    hot: true,
    inline: true,
    compress: true,
    port: 8080,
    overlay: true,
    disableHostCheck: true,
    historyApiFallback: true
  }
};

module.exports = config;
