"use strict";

const path = require("path");
const config = require("./config.json");
const webpack = require("webpack");

module.exports = {
	entry: [
		"webpack/hot/dev-server",
		`webpack-dev-server/client?http://0.0.0.0:${config.site.port + 1}`,
		path.resolve(__dirname, "app/app.js")
	],

	output: {
		path: path.resolve(__dirname, "build"),
		filename: "app.js"
	},

	modulesDirectories: [
		"node_modules"
	],

	watchOptions: {
		poll: 1000,
		aggregateTimeout: 1000
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: [ "react-hot", "babel" ]
			},
			{
				test: /\.s?css$/,
				exclude: /node_modules/,
				loader: "style!css!sass"
			},
			{
				test: /\.(png|jpg)$/,
				exclude: /node_modules/,
				loader: "url?limit=25000"
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};
