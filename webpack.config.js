var path = require('path');

module.exports = {
  entry: path.resolve('src/scripts/main.ts'),

  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },

  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules|\.js$/,
  },

  resolve: {
    extensions: [ '.ts', '.js', '.scss', '.sass' ]
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules|dist/,
        use: {
          loader:'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules|dist/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules|dist/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
};