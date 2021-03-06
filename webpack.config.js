var webpack = require('webpack');
var packageJson = require('./package.json');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/public',
        filename: '[hash].bundle.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        root: path.join(__dirname, 'src'),
        modulesDirectories: ['node_modules'],
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|ico|svg|ttf|eot|woff|woff2|mp3)$/,
                loader: 'url-loader?limit=10000'
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Online idea',
            favicon: __dirname + '/favicon.ico',
            template: __dirname + '/index.html'
        }),
        new webpack.DefinePlugin({
            PROJECT: JSON.stringify(packageJson.name),
            VERSION: JSON.stringify(packageJson.version),
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            'i18next': 'i18next',
            '_': 'lodash'
        })
    ],

    devServer: {
        contentBase: '.',
        host: 'localhost',
        port: 9000
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100
    }
};