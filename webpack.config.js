const child = require('child_process');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env, options) => {
  const isProductionMode = options.mode === 'production';
  const onlyVueEnvironment = env.onlyvue;

  const webpackConfig = {
    context: path.resolve(__dirname, 'src'),
    entry: './app.js',
    output: {
      path: path.resolve(__dirname, 'docs/assets'),
      publicPath: '/assets/',
      filename: isProductionMode ? '[name]-[chunkhash].js' : '[name].js',
    },
    devtool: isProductionMode ? 'source-map' : 'cheap-module-eval-source-map',
    module: {
      rules: [
        { // Vue loaders config
          test: /\.vue$/,
          use: 'vue-loader',
        },
        { // JS loaders config
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        },
        { // CSS loaders config
          test: /\.s[ac]ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader',
            {
              loader: 'style-resources-loader',
              options: {
                patterns: [
                  path.resolve(__dirname, './src/styles/main.scss'),
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      { // run shell commands after webpack builds
        apply: compiler => {
          if (!onlyVueEnvironment)
            compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
              child.exec('bundle exec jekyll build --config docs/_config.yml', (err, stdout, stderr) => {
                if (stdout) process.stdout.write(stdout);
                if (stderr) process.stderr.write(stderr);
              });
            });
        },
      },
      new HtmlWebpackPlugin({
        filename: '../_includes/scripts.html',
        template: './templates/scripts.html',
      }),
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
    ],
    // tell webpack to minimize the bundle
    optimization: {
      minimize: isProductionMode,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
        }),
      ],
    },
  };
  return webpackConfig;
};
