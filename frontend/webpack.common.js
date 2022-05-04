const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-runtime',
            [
              '@babel/plugin-transform-react-jsx',
              {
                runtime: 'classic',
                pragma: 'jsx',
              },
            ],
          ],
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      jsx: [
        path.resolve(path.join(__dirname, 'src/utils/jsx-runtime.js')),
        'default',
      ],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.png',
      templateParameters: {
        kakaoURL: process.env.KAKAO_API_KEY,
      },
    }),
  ],
};
