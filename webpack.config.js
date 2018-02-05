var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        server: './server/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            './': './server'
        },
        modules: ["node_modules"]
    },
    devtool: 'source-map'
};