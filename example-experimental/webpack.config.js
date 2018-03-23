const { resolve } = require('path')
const SVGSymbolSpritePlugin = require('svg-symbol-sprite-loader/src/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const configs = {
    mode: env,

    output: {
      path: resolve('dist'),
      filename: '[name].[chunkhash].js',
      publicPath: '/',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [resolve('node_modules'), resolve('src')],
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
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'svg-symbol-sprite-loader',
              options: {
                componentName: 'Icon',
                importPath: 'media',
              },
            },
            {
              loader: 'svg-symbol-sprite-loader',
              options: {
                componentName: 'Ionicon',
                importPath: 'ionicons/dist/svg',
              },
            },
          ],
        },
      ],
    },

    plugins: [
      // Generates index.html and injects script and style tags
      new HtmlWebpackPlugin({
        minify: false,
        title: 'SVG Symbol Sprite Loader Complete',
        template: resolve('public/index.html'),
      }),

      // Extracts the imported SVGs into a separate sprite file
      new SVGSymbolSpritePlugin({
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
