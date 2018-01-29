const path = require('path');

module.exports = [ {
	entry: './content.jsx',
	output: { path: __dirname, filename: 'content.js' },
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {presets:[ 'es2015', 'react']}
		}]
	}
} ]
