const config = require('./config.json');
const TerserPlugin = require("terser-webpack-plugin");

const webpackConfig = {
    entry: [
        './src/js/app.js',
    ],

    output: {
        path: __dirname,
        filename: '[name].bundle.js',
        publicPath: '/assets/js/',
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
            options: {
                compact: true
            }
        }]
    },

    resolve: {
        modules: ['./src/js', 'node_modules']
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    devtool: 'eval',
};

if (!global.isDev) {
    webpackConfig.devtool = config.prodmaps ? 'source-map' : false;
    webpackConfig.plugins = [];
}


module.exports = webpackConfig;
