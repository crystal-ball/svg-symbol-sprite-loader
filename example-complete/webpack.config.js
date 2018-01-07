const { resolve } = require('path')
const SVGSymbolSpritePlugin = require('svg-symbol-sprite-loader/src/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin')

module.exports = env => {
  const configs = {
    entry: {
      app: [resolve('src/index.jsx')],
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
      // Extracts the imported SVGs into a separate sprite file
      new SVGSymbolSpritePlugin({
        filename: 'icon-sprite.[chunkhash].svg',
      }),

      // Extract the webpack manifest into a separate JSON file
      new ManifestPlugin(),

      // Inline the manifest JSON file into index head
      new InlineChunkManifestHtmlWebpackPlugin(),

      // Generates index.html and injects script and style tags
      new HtmlWebpackPlugin({
        minify: false,
        title: 'SVG Symbol Sprite Loader Complete',
        template: resolve('public/index.html'),
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
