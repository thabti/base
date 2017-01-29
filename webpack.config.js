const { resolve, join} = require('path');
const package = require('./package.json');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = {
	entry: [
		'./main.js'
	],
	output: {
		filename: '[name]/[name].js',
		libraryTarget: 'umd',
		path: resolve(__dirname, 'dist'),
		publicPath: '/',
		hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
		hotUpdateMainFilename: 'hot/[hash].hot-update.json'
	},

	context: resolve(__dirname, 'src'),

	devServer: {
		hot: true,
		historyApiFallback: true,
		noInfo: false,
		contentBase: resolve(__dirname, 'dist'),
		stats: 'errors-only',

		publicPath: '/'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/, use: "eslint-loader", exclude: /node_modules/
			},
			{
				test: /\.css|.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: package.config.cssModulePattern
						}
					},
					'sass-loader?sourceMap'
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new CopyWebpackPlugin([
			{ from: 'index.html', to: 'index.html' }
		]),
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : process.env.NODE_ENV),
		}),
		new WriteFilePlugin({
			log: false,
			useHashIndex: true
		}),
	],
};

if (isProduction) {
	config.devtool = 'source-map';
	config.plugins[1] = () => { };
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({ output: { comments: false }, sourceMap: true })
	);

} else {
	config.devtool = 'cheap-eval-source-map';
	config.entry.unshift(
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server'
	);
}

module.exports = config;