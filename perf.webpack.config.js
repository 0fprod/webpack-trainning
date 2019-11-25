const merge = require('webpack-merge');
const base = require('./prod.webpack.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(base, {
  plugins: [new BundleAnalyzerPlugin()]
});