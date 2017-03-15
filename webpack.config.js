var path = require('path'); // path模块，处理文件路径的小工具

module.exports = {
	entry: path.resolve(__dirname, 'app/index.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
	}
}