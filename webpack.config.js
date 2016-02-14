var path = require('path');

module.exports = {
  entry: './static/boot.ts',
  output: {
    filename: 'bundle.js'
  },
  debug: false,
  resolve: {
    modulesDirectories: ['node_modules'],
    root: './static',
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          root('node_modules')
        ]
      }
    ],
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      // css
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
    ],
    noParse: [/zone\.js\/dist\/.+/, /angular2\/bundles\/.+/]
  }
};

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

