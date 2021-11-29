const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../', 'build'),
        filename: 'bundle.[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/,
                exclude: /node_modules/,
                loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            chunkFilename: '[id].[contentHash].css'
        })
    ],
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: {
                        comparisons: false
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        comments: false,
                        ascii_only: true
                    },
                    warnings: false
                },
                // Use multi-process parallel running to improve build speed
                parallel: true,
                // Enable file caching
                cache: true
            }),
            new OptimizeCssAssetsPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors'
                },
                common: {
                    minChunks: 2,
                    priority: -10
                }
            }
        },
        // Keep the webpack runtime chunk separated to enable long term caching
        runtimeChunk: 'single'
    }
};
