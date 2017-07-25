var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var styleLintPlugin = require('stylelint-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [__dirname + '/src/js/app.js', __dirname + '/src/scss/app.scss'],
    output: {
        filename: 'dist/main.js'
    },
    module: {
        rules: [
            { // ci-dessous, on défini les regle de la tache scss
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
                options: {
                    includePaths: [ __dirname + "\\node_modules\\bootstrap\\scss\\bootstrap.scss"]
                }
            }
        ]
    },
    plugins: [
        // ci-dessous, on défini l'endroit et le nom du fichier compilé
        new ExtractTextPlugin({
            filename: 'dist/main.css',
            allChunks: true,
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};