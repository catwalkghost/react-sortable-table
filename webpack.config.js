const webpackMerge = require('webpack-merge');
const common = require('./webpack/webpack.common');

const env = process.env.NODE_ENV || 'development';
const envConfig = env === 'development' ? require('./webpack/webpack.dev') : require('./webpack/webpack.prod');

module.exports = webpackMerge(common, envConfig);
