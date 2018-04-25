
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglify = require('uglifyjs-webpack-plugin');
var extractTextPlugin = require("extract-text-webpack-plugin");
var copyWebpackPlugin= require("copy-webpack-plugin");
if(process.env.type== "build"){
    var website={
        publicPath: './'
    }
}else{
    var website={
        publicPath:"http://localhost:1717/"
    }
}

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
    return {
        template    : 'html-withimg-loader!'+'./src/views/'+name+'.html',
        filename    : name+'.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name],
        // 压缩HTML代码，生产的时候用
        minify      : {
            caseSensitive           : false,
            removeComments          : true,
            removeEmptyAttributes   : true,
            collapseWhitespace      : true
        }
    };
};
var config = {
    // devtool: 'eval-source-map',
    //入口文件的配置项 单页面为一项，多页面又多少个页面就有多少项
    //common为公用类。
    entry:{
        'common'        : ['./src/page/common/index.js'],
        'index'         : ['./src/page/index/index.js'],
        'login'         : ['./src/page/login/index.js'],
        'register'      : ['./src/page/register/index.js'],
        'currency'      : ['./src/page/currency/index.js'],
        'worker'        : ['./src/page/worker/index.js'],
        'etcteach'      : ['./src/page/etcteach/index.js'],
        'hsrteach'      : ['./src/page/hsrteach/index.js'],
        'etfteach'      : ['./src/page/etfteach/index.js'],
        'lchteach'      : ['./src/page/lchteach/index.js'],
        'notice'        : ['./src/page/notice/index.js'],
        'about'         : ['./src/page/about/index.js'],
        'order'         : ['./src/page/order/index.js'],
        'activity'      : ['./src/page/activity/index.js']
    },
    //出口文件的配置项
    output:{
        //打包的路径
        path : __dirname+'/dist/',
        filename : 'js/[name].js',
        publicPath:website.publicPath
    },
    resolve: {
        // 配置路径，为js require文件提供快捷路径
        alias: {
            'page' : path.resolve('./src/page'),
            'images' : path.resolve('./src/images'),
            'util' : path.resolve('./src/util'),
            'lib' : path.resolve('./src/lib')
        }
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules:[
            {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    // use: "css-loader"
                    // 压缩CSS代码，生产时候用
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }]
                })
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader?limit=500000&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                use: ['file-loader?name=fonts/[name].[ext]']
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins:[
        // 压缩JS代码，生产时候用
        new uglify(),

        new copyWebpackPlugin([{
            from:__dirname+'/src/lib',
            to:'./lib'
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new extractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            favicon: path.resolve('./src/images/favicon.ico')
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','登录')),
        new HtmlWebpackPlugin(getHtmlConfig('register','注册')),
        new HtmlWebpackPlugin(getHtmlConfig('currency','货币详情')),
        new HtmlWebpackPlugin(getHtmlConfig('worker','矿工详情')),
        new HtmlWebpackPlugin(getHtmlConfig('etcteach','ETC挖矿教程')),
        new HtmlWebpackPlugin(getHtmlConfig('etfteach','ETF挖矿教程')),
        new HtmlWebpackPlugin(getHtmlConfig('hsrteach','HSR挖矿教程')),
        new HtmlWebpackPlugin(getHtmlConfig('lchteach','LCC挖矿教程')),
        new HtmlWebpackPlugin(getHtmlConfig('notice','活动公告')),
        new HtmlWebpackPlugin(getHtmlConfig('about','关于我们')),
        new HtmlWebpackPlugin(getHtmlConfig('order','服务协议')),
        new HtmlWebpackPlugin(getHtmlConfig('activity','服务协议'))
    ],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'91pool'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }
};

module.exports = config;
