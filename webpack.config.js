const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const ENVIRONMENT = process.env.NODE_ENV || DEVELOPMENT;

module.exports = {
  mode: ENVIRONMENT,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Moment',
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      title: 'Moment',
      filename: 'upload.html',
      template: 'src/upload.html',
      chunks: ['upload'],
    }),
    new HtmlWebpackPlugin({
      title: 'Moment',
      filename: 'detail.html',
      template: 'src/detail.html',
      chunks: ['detail'],
    }),
    new MiniCssExtractPlugin(),
  ],
  entry: {
    main: './src/js/index.js',
    upload: './src/js/upload.js',
    detail: './src/js/detail.js',
  },
  output: {
    path: path.resolve(__dirname, `${ENVIRONMENT === DEVELOPMENT ? 'public' : 'dist'}`),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.s?css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        include: [path.resolve(__dirname, 'src/scss')],
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  devtool: 'source-map',
};
