const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // son plugins que ya trae webpack x defecto
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const basePath = __dirname;

module.exports = {
  // entry: ['regenerator-runtime/runtime', './students.js', './style.css'],
  context: path.join(basePath, 'src'), // añade src/ a todas las entries
  resolve: {
    extensions: ['.js', '.ts', '.tsx']// te ahorra añadir las extensiones en los import de los ficheros .jsx
  }, // por ejemplo `import {component } from './fichero` en lugar de fichero.jsx|js
  entry: {
    app: ['regenerator-runtime/runtime', './students.tsx'],
    appStyles: [
      './style.scss',
      // './averageComponentStyles.scss',
      // './totalScoreComponentStyles.scss'
    ],
    vendorStyles: ['../node_modules/bootstrap/dist/css/bootstrap.css']
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
    // filename: 'bundle.js'
    filename: '[name].[chunkhash].js' // se usa para cuando el entry esta estructurado
  },
  // devtool: 'inline-source-map', // crea ficheros .map para poder debugar en chrome
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
      // { // usamos el minicssextract en lugar de los 2 loaders anteriores, la diferencia es que este lo mete en un fichero css que pesa menos, en lugar de meterlos en un tag en el html
      //   test: /\.css$/,
      //   // exclude: /node_modules/, // quitamos el exclude porq añadimos un vendorstyles que está dentro de nodemodules
      //   use: [
      //     miniCssExtractPlugin.loader,
      //     'css-loader'
      //   ]
      // },
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   use: [
      //     miniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           localIdentName: '[name]_[local]_[hash:base64:5]'
      //         }, // a cada clase de css le pone como prefijo el nombre dl fichero [name], [local] es el nombre de la clase y [hash] un codigo unico
      //         localsConvention: 'camelCase', // nos permite usar camelcase a la hora de acceder a las classes de un scss en el className
      //       } // para evitar prefijos y tal, en el css se pone :global(.globalclassname) (+ concatenacion opcional de otra clase)
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         implementation: require('sass')
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(jpg|png)$/,
        exclude: /node_modules/,
        // loader: 'file-loader' // te la pone aparte la imagen, no va al bundle
        loader: 'url-loader?limit=5000' // si pesa menos de 5k embébelo en el js (entonces lo mete en el bundle), sino la saca de imagen externa
      },
      {
        test: /.\html$/,
        loader: 'html-loader' // coge las imagenes del html y los mete en el context de la ruta
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: { // opciones para transpilar de ts a es6 (el loader) y luego babel de es6 a es5
          useBabel: true,
          babelCore: '@babel/core' // necesario para babel v7
        } // cheat: babel 7 lo transpila todo
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
    // new miniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css'
    // })
  ]
}