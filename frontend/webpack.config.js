const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: './src/app.js',
  mode:'development',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9001,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
    template: "./index.html",
    baseUrl: '/'
  }),
    new CopyPlugin({
      patterns: [
        { from: "./src/templates", to: "templates" },
        { from: "./src/images", to: "images" },
        { from: "./node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff", to: "css/fonts" },
        { from: "./node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2", to: "css/fonts" },
        { from: "./node_modules/jquery/dist/jquery.min.js", to: "js" },
        { from: "./node_modules/admin-lte/plugins/chart.js/Chart.min.js", to: "js" },
        { from: "./node_modules/admin-lte/dist/js/adminlte.min.js", to: "js" },
        { from: "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", to: "js" },
        { from: "./node_modules/bootstrap/dist/css/bootstrap.min.css", to: "css" },
        { from: "./node_modules/bootstrap-icons/font/bootstrap-icons.min.css", to: "css" },



      ],
    }),
  ],
};

