var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: __dirname + "/public",
        filename: '[hash].bundle.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|gif|ico|svg|ttf|eot|woff|woff2|mp3)$/,
                loader: "url-loader?limit=10000"
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'React webpack typescript',
            template: __dirname + '/index.html'
        })
    ],
    
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100
    }
};