const { resolve } = require('path')
const SVGSymbolSprite = require('svg-symbol-sprite-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => ({
  mode: env,

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [{ loader: 'svg-symbol-sprite-loader' }],
      },
      {
        test: /\.js$/,
        include: resolve('src'),
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: resolve('public/index.html') }),
    new SVGSymbolSprite.Plugin(),
  ],

  devServer:
    env !== 'production'
      ? {
          host: '0.0.0.0',
          port: 3000,
          historyApiFallback: true,
          contentBase: resolve('public'),
        }
      : {},
})
