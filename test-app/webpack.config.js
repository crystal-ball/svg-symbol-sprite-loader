const { resolve } = require('path')
const SVGSymbolSprite = require('svg-symbol-sprite-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const configs = {
    mode: env,

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [{ loader: 'svg-symbol-sprite-loader' }],
        },
        {
          test: /\.jsx?$/,
          include: resolve('src'),
          use: [{ loader: 'babel-loader' }],
        },
      ],
    },

    plugins: [
      // Generates index.html and injects script and style tags
      new HtmlWebpackPlugin({
        minify: false,
        title: 'SVG Symbol Sprite Loader',
        template: resolve('public/index.html'),
      }),

      // Extracts the imported SVGs into a separate sprite file
      new SVGSymbolSprite.Plugin({
        filename: 'icon-sprite.[contenthash:10].svg',
      }),
    ],
  }

  if (env !== 'production') {
    configs.devServer = {
      host: '0.0.0.0',
      port: 3000,
      historyApiFallback: true,
      contentBase: resolve('public'),
    }
  }

  return configs
}
