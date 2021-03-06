const webpack = require('webpack');

const commonPaths = require('./paths');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    publicPath: '/',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localsConvention: 'camelCase',
              // modules: true,
              // modules: {
              //   localIdentName: '[local]___[hash:base64:5]',
              // },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  externals: {
    config: JSON.stringify({
      staffApi: '/',
      userApi: 'https://webtruyenhay.herokuapp.com/',
      userApi1: 'http://localhost:8080/',
      rootUrl: '/',
      staff: '/staff',
    }),
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
