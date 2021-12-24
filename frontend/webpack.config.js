const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
    publicPath: '/',
    assetModuleFilename: '[name][ext]?[hash]',
  },
  devServer: {
    port: 9000,
    hot: true,
    historyApiFallback: true,
  },
  optimization: {
    minimizer:
      mode === 'production'
        ? [
            new CssMinimizerPlugin(),
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 로그 제거
                },
              },
            }),
          ]
        : [],
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/, // sass(scss), css 확장자로 끝나는 모든 파일을 의미
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 기준으로 20kb 로 변경
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', // 바벨 로더
        exclude: /node_modules/, // 제외
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // 읽어 올 템플릿 경로 지정
      favicon: './public/favicon.png',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
        kakaoURL: process.env.KAKAO_API_KEY,
        googleURL: process.env.GOOGLE_API_KEY,
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
    }),
    new CleanWebpackPlugin(), // dist 폴더 cleaner
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []),
  ],
};
