const { resolve } = require('path')
const SVGSymbolSpritePlugin = require('svg-symbol-sprite-loader/src/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const configs = {
    entry: {
      app: resolve('src', 'index.jsx'),
    },

    output: {
      path: resolve('build'),
      filename: '[name].[chunkhash].js',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },

    module: {
      rules: [
        {
          // The loader transforms imported SVGs into single line comments that will
          // be stripped out during minification.
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
                importPath: './media',
              },
            },
          ],
        },
      ],
    },

    plugins: [
      // Plugin for SVG symbol sprite extracts imported SVGs into a file
      // ⚠️ Plugin order matters! This plugin and the WebpackManifestPlugin/
      // InlineChunkManifestHtmlWebpackPlugin hook into the compiler 'emit' event.
      // This plugin must run first so that the generated sprite can be added to the
      // build chunks before the manifest plugin checks what chunks are in the build!
      new SVGSymbolSpritePlugin({
        filename: 'icon-sprite.[hash:8].svg',
      }),

      // Generates index.html and injects script and style tags
      new HtmlWebpackPlugin({
        template: resolve('public', 'index.html'),
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
