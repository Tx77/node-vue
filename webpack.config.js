const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
	entry : './src/main',
	output : {
		path : path.join(__dirname,'./dist'),
		filename : "[name].js",
		publicPath : "dist/"
	},
	target : 'node', //告诉webpack打包的对象是node端的代码，这样原生模块webpack就不会做处理
	externals : nodeModules, //告知webpack在打包过程中，遇到externals声明的模块不用处理
	module : {
		exprContextCritical: false,
		loaders : [
			{ test : /\.js$/, loader : "babel-loader", exclude : /node_modules/ },
			{ test : /\.vue$/, loader : "vue-loader" },
			{ test : /\.css$/, loader : 'style-loader!css-loader!sass-loader' }
		]
	},
	resolve : {
		// require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.vue','.css'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            components: path.join(__dirname, './src/components')
        }
	},
	plugins : [
		new ExtractTextPlugin('[name].css'),
		new webpack.ProvidePlugin({
			jQuery : "jquery",
			$ : "jquery"
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};