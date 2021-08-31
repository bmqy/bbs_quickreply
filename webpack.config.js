const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: './src/index.js',
  },
  externals:{
    'vue': 'Vue',
    'element-ui': 'ElementUI',
    'av': 'AV',
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: __dirname +'/dist/'
  },
  module: {
    rules: [
      {
        test: /(\.css|\.less)$/,
        use: [          
          'vue-style-loader',
          'css-loader',
          'less-loader',
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '[path][name][ext]'
        }
      ]      
    }),
  ],
  optimization:{
    minimize: false, // 禁止压缩混淆源代码
  }
}