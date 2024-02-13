const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'inline-source-map',
  entry: ['webpack/hot/poll?1000', './src/server.js'],
  watch: true,
  target: 'node',
  stats: {
    errorDetails: true,
    children: true
  },
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@models": path.resolve(__dirname, "src/models"),
      "@controllers": path.resolve(__dirname, "src/controllers"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@middlewares": path.resolve(__dirname, "src/middlewares"),
      "@config": path.resolve(__dirname, "src/config")
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
