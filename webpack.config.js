const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const ENVIRONMENT = process.env.NODE_ENV || DEVELOPMENT;

module.exports = {
  mode: ENVIRONMENT,
  plugins: [
    new HtmlWebpackPlugin({ title: 'Moment' }),
    // new HtmlWebpackPlugin({
    //   title: 'Moment',
    //   filename: 'main.html',
    //   template: 'src/main.html',
    // }),
    new MiniCssExtractPlugin(),
  ],
  entry: './src/js/index.js',
  output: {
    path: path.resolve(
      __dirname,
      `${ENVIRONMENT === DEVELOPMENT ? 'public' : 'dist'}/`
    ),
    filename: 'main.js',
  },
  module: {
    rules: [
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
          },
        },
      },
    ],
  },
  devtool: 'source-map',
};
