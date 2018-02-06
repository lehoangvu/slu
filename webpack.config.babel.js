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
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: /server/,
            exclude: /node_modules/,
        }]
    },
    resolve: {
        alias: {
            '~': './server'
        },
        modules: ["node_modules"]
    },
    devtool: 'source-map',
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        module: 'empty',
        dns: 'empty'
    }
};