var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var styleLintPlugin = require('stylelint-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [__dirname + '/src/js/app.js', __dirname + '/src/scss/app.scss'],
    output: {
        path: path.join( __dirname + '/dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {   // ci-dessous, on défini les regle de la tache scss
                // Pour MINIFY, executez webpack -p
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
            }
        ]
    },
    plugins: [
        // ci-dessous, on défini l'endroit et le nom du fichier compilé
        new ExtractTextPlugin({
            filename: 'main.min.css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            'window.Tether': 'tether',
            tether: 'tether',
            Tether: 'tether'
        })
    ]
};