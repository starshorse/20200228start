const path = require('path');

module.exports = {
    entry: './src/index.js',  // entry file
    output: {
        filename: 'main.js',    // output .js file name
        path: path.resolve(__dirname, './dist'),    // output is positioned in this directory
        publicPath: '',
    },
    mode: 'production', // select build mode
    optimization: { minimizer: [] },
}
