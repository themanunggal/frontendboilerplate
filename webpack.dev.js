const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webset = require("./webset.js");


module.exports = {

    entry: {
        main: [
            "./src/js/app.js"
        ]
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    mode: "development",
    devServer: {
        contentBase: "dist",
        overlay: true,
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].html'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: "ejs-webpack-loader"
                    },
                    {
                        loader: 'ejs-html-loader',
                        options: {
                            data: webset
                        }
                    },
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].html"
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"],
                            interpolate: true
                        }
                    },
                    {
                        loader: 'ejs-html-loader'
                    },
                    {
                        loader: 'ejs-html-loader',
                        options: {
                            data: webset
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|gif|svg|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        new CopyWebpackPlugin([
            { from: './node_modules/@fortawesome/fontawesome-free/webfonts', to: './webfonts'}
        ])
    ]
}