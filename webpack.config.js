const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ErrorNotificationPlugin = require("webpack-error-notification-plugin");

const devMode = process.env.NODE_ENV !== "production";
let slides = [];
slides.push(addSlide('index'));

const browserSync = new BrowserSyncPlugin({
    host: "localhost",
    port: 3000,
    proxy: "http://localhost:8080/",
});

const miniCss = new MiniCssExtractPlugin({
    filename: "css/[name].css",
});

module.exports = {
    entry: [`${__dirname}/js/main.js`, `${__dirname}/scss/app.scss`],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/main.js",
    },

    devServer: {
        hot: true,
        static: "./dist",
    },

    devtool: devMode ? "inline-source-map" : false,

    performance: {
        hints: false,
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                        },
                    },
                    {
                        loader: "css-loader",
                        options: { sourceMap: devMode, url: true },
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: /\.pug$/,
                use: {
                    loader: "@webdiscus/pug-loader",
                },
            },
            {
                test: /\.(jp?g|png|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name]-[hash][ext]', // Use [hash] to prevent conflicts
                },
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new ErrorNotificationPlugin(),
        browserSync,
        miniCss,
        ...slides,
    ],
};

function addSlide(name) {
    return new HtmlWebpackPlugin({
        template: `views/${name}.pug`,
        inject: "body",
        mobile: true,
        filename: `${name}.html`,
    });
}
