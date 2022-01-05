const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const ENVIRONMENT = process.env.NODE_ENV || DEVELOPMENT;

const urls = ['index', 'upload'];
const htmlWebpackPlugins = () =>
  urls.map(
    url =>
      new HtmlWebpackPlugin({
        title: 'Moment',
        filename: `${url}.html`,
        template: `src/${url}.html`,
        chunks: [url === 'index' ? 'main' : url],
      })
  );

module.exports = {
  mode: ENVIRONMENT,
  plugins: [...htmlWebpackPlugins(), new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
  entry: {
    main: './src/js/index.js',
    upload: './src/js/upload.js',
    detail: './src/js/detail.js',
  },
  output: {
    path: path.resolve(__dirname, `${ENVIRONMENT === DEVELOPMENT ? 'public' : 'dist'}`),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext]',
        },
      },
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
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, 'public'),
  //   },
  // },
};
