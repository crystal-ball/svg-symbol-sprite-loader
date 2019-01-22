const { basename, resolve } = require('path')
const SVGSymbolSprite = require('svg-symbol-sprite-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const chunkHash = process.env.NODE_ENV === 'production' ? '.[chunkhash]' : ''

module.exports = env => ({
  mode: env,
  output: {
    publicPath: '/',
    filename: `[name]${chunkHash}.js`,
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-symbol-sprite-loader',
            options: {
              symbolId: filePath => `icon-${basename(filePath, '.svg')}`,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: resolve('src'),
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
    }),

    new SVGSymbolSprite.Plugin({
      filename: `icon-sprite${chunkHash}.svg`,
    }),
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
