const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // son plugins que ya trae webpack x defecto
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //entry: ['regenerator-runtime/runtime', './students.js', './style.css'],
  entry: {
    app: ['regenerator-runtime/runtime', './students.js'],
    appStyles: './style.css',
    //vendor: [ 'jquery' ] // no hace falta porq ya esta en el optimization
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/, // todo lo que esté en nodemodules y lo esté usando en mi app va al chunk de vendor
          enforce: true
        }
      }
    }
  },
  output: {
    //filename: 'bundle.js'
    filename: '[name].[chunkhash].js' // se usa para cuando el entry esta estructurado
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.css$/, // es necsario 2 loaders (css-loader) y (style-loader) empieza ejecutando el array de fin a inicio
      //   exclude: /node_modules/,
      //   use: [
      //     { loader: 'style-loader' }, // el string generado por el css lo inyecta en un <style> en el html
      //     { loader: 'css-loader' } // extrae todo los contenidos de los .css y los mete en un string dentro del appstyles.js
      //   ]
      // }
      { // usamos el minicssextract en lugar de los 2 loaders anteriores, la diferencia es que este lo mete en un fichero css que pesa menos, en lugar de meterlos en un tag en el html
        test: /\.css$/,
        exclude: /node_modules/,
        use: [miniCssExtractPlugin.loader, 'css-loader']

      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // se encarga de añadir el .bundle al fichero html
      filename: 'index.html', // fichero destino
      template: 'index.html', // fichero origen
      // hash: true // no es necesario cuando esta estructurado el entry, pq sino le asignaria el mismo hash a las multipls entries
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new miniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}