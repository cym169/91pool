var path = require('path');
var webpack = require('webpack');
var os = require('os');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglify = require('uglifyjs-webpack-plugin');
var extractTextPlugin = require("extract-text-webpack-plugin");
var copyWebpackPlugin = require("copy-webpack-plugin");
var CompressionWebpackPlugin = require("compression-webpack-plugin");
var glob = require('glob');
var minimize, minify, ugly,globalUrl;
switch (process.env.type){
    case 'build':
        minimize = true;
        minify = {
            caseSensitive: false,
            removeComments: true,
            removeEmptyAttributes: true,
            collapseWhitespace: true
        };
        ugly = new uglify();
        globalUrl = "http://www.91pool.com/api";
        break;
    case 'beta':
        minify = {};
        minimize = false;
        ugly = function () {
        };
        globalUrl = "http://172.16.2.12:8880/api";
        break;
    default :
        minify = {};
        minimize = false;
        ugly = function () {
        };
        globalUrl = "http://www.91pool.com/api";
}
var entries = {
    'common': './src/common/index.js'
};
var chunks = [];
var htmlWebpackPluginArray = [];
glob.sync('./src/page/**/index.js').forEach(function (myPath) {
    var chunk = myPath.split('./src/page/')[1].split('/index.js')[0];
    entries[chunk] = myPath;
    chunks.push(chunk);
    var m = myPath.replace(/page/, "views").split('/index.js')[0]+".html";
    // html-webpack-plugin参数
    var htmlConfig = {
        template: 'html-withimg-loader!' + m,
        filename: chunk + '.html',
        inject: true,
        hash: true,
        chunks: ['common','manifest', chunk],
        title: chunk,
        // 压缩HTML代码，生产的时候用
        minify: minify
    };
    // console.log(con)
    htmlWebpackPluginArray.push(new HtmlWebpackPlugin(htmlConfig))
});
var config = {
    // devtool: 'eval-source-map',
    //入口文件的配置项 单页面为一项，多页面又多少个页面就有多少项
    //common为公用类。
    entry: entries,
    //出口文件的配置项
    output: {
        //打包的路径
        path: path.resolve(__dirname, './91pool'),
        filename: 'js/[name].[hash:8].js',
        publicPath: '/'
    },
    resolve: {
        // 配置路径，为js require文件提供快捷路径
        alias: {
            'common': path.resolve('./src/common'),
            'page': path.resolve('./src/page'),
            'images': path.resolve('./src/images'),
            'util': path.resolve('./src/util'),
            'lib': path.resolve('./src/lib'),
            'teach': path.resolve('./src/teach')
        }
    },
    externals: {
        "globalUrl": JSON.stringify(globalUrl)
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: minimize
                        }
                    }]
                })
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100,
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                use: ['file-loader?name=fonts/[name].[ext]']
            },
            {
                test: /\.string$/,
                loader: 'html-loader'
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins: [

        ugly,

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),

        new copyWebpackPlugin([{
            from: __dirname + '/src/lib',
            to: './lib'
        }]),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name : 'common',
        //     filename : 'js/base.js'
        // }),
        new webpack.optimize.CommonsChunkPlugin({names: ["common"]}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['common']
        }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: function (module) {
        //         return (
        //             module.resource &&
        //             /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../node_modules')
        //             ) === 0
        //         )
        //     }
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     chunks: ['commons'],
        //     minChunks: function (module) {
        //         return (
        //             module.resource &&
        //             /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../node_modules')
        //             ) === 0 && ['jquery.js', 'layer.js'].indexOf(module.resource.substr(module.resource.lastIndexOf('/') + 1).toLowerCase()) != -1
        //         )
        //     }
        // }),  // 如果愿意，可以再new 一个commonsChunkPlugin
        new extractTextPlugin({
            filename: 'css/[name].[contenthash:8].css',
            disable: false,
            allChunks: true
        }),
        // new extractTextPlugin('css/[name].[chunkHash:8].css'),

        new HtmlWebpackPlugin({
            favicon: path.resolve('./src/images/favicon.ico')
        }),
        
    ],
    //配置webpack开发服务功能
    devServer:{
        // proxy: {
        //     '/currencies': {
        //         target: 'https://www.feixiaohao.com/currencies',
        //         changeOrigin: true,
        //         // secure: false,
        //         pathRewrite: { '^/currencies': '' }
        //     }
        // },
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'91pool'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:getIPAdress(),
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }
};

config.plugins = [...config.plugins,...htmlWebpackPluginArray]
module.exports = config;

function getIPAdress(){
    var interfaces = os.networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}