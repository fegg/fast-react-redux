var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'source-map',
    entry: {
        index: path.resolve(__dirname, 'js/index.jsx') 
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'static'),
        publicPath: '/static'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel']
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: ['style', 'css']
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            loaders: ['style', 'css', 'sass']
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', 'scss']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ]
};

module.exports = config;