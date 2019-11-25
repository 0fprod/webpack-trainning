const merge = require('webpack-merge');
const base = require('./base.webpack.config');

module.exports = merge(base, {
  output: {
    filename: '[name].js' // le quitamos el chunkhash porq en development no nos hace falta (porq nos daría conflicto con el HotModuleRealoader)
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]'
              },
              localsConvention: 'camelCase',
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
    ]
  },
  devtool: 'inline-source-map',
  mode: 'development'
});