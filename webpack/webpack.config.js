const path = require('path');
const publicPath = '/themes/d8_theme_bs4/assets/';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer')({ browsers: 'last 2 versions' });
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

function getPostcssPlugins(){
    return [autoprefixer]
}

module.exports = {

    entry: [
        'font-awesome-loader',
        bootstrapEntryPoints.prod,
        'tether',
        path.resolve(__dirname + '/src/js/script.js')
    ],

    output: {
        path: path.join( __dirname + '/../assets'),
        filename: 'js/script.js'
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'css/style.css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            Tether: 'tether',
            'window.Tether': 'tether',
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util"
        }),
        new webpack.LoaderOptionsPlugin({
            postcss: getPostcssPlugins
        })
    ],

    resolve: {
        extensions: ['*', '.js']
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },{
                        loader: 'postcss-loader',
                        options : {
                            plugins:getPostcssPlugins
                        }
                    }],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }, {
                        loader: 'postcss-loader',
                        options : {
                            plugins:getPostcssPlugins
                        }
                    }, {
                        loader: 'sass-loader'
                    }, {
                        loader: 'resolve-url-loader'
                    }, {
                        loader: 'csso-loader',
                        options: {
                            restructure: true
                        }
                    }],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // use: "url?limit=10000"
                use: 'url-loader?limit=10000&name=[name].[ext]&outputPath=fonts/&publicPath='+publicPath+'fonts/'
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader?name=[name].[ext]&outputPath=fonts/&publicPath='+publicPath+'fonts/'
            },

            // Bootstrap 3
            {
                test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                use: 'imports-loader?jQuery=jquery'
            },

            // Bootstrap 4
            {
                test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/,
                use: 'imports-loader?jQuery=jquery'
            },

            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=img/',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },


    watch: false,
    watchOptions: {
        ignored: '/node_modules/'
    }

};