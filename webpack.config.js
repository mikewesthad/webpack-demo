/* eslint-env node */

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");

const extractPlugin = new ExtractTextPlugin({
    filename: "main.css"
});

module.exports = {
    context: path.join(__dirname, "src"),
    entry: {
        main: "./js/main.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: "babel-loader",
                        options: {presets: ["es2015"]}
                    },
                    "eslint-loader"
                ]
            }, 
            {
                test: /\.(scss|sass)$/,
                use: extractPlugin.extract({
                    use: [
                        {loader: "css-loader", options: {sourceMap: true}},
                        {loader: "postcss-loader", options: 
                            {plugins: () => [autoprefixer()], sourceMap: true}
                        },
                        {loader: "sass-loader", options: {sourceMap: true}}
                    ]
                })
            }
        ]
    },
    plugins: [
        extractPlugin,
        new CopyWebpackPlugin([
            {from: "index.html"},
            {from: "images/**/*"}
        ])
    ],
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "src")
    }
};