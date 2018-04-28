# 91pool
node+webpack+webpack-dev-server搭建的多页面网站

#开发框架
因为是展示类的网站，要考虑兼容IE低版本，所以我选择的是jquery，版本是1.11.3。
由由于是在开发中间提出要兼容移动端，所以没有办法选了个折中的办法，直接用媒体选择器对页面进行兼容

# 运行步骤
1. npm install

2. npm run dev

3. npm run build

在webpack配置文件里面已经把生产环境需要压缩的都添加进去了，默认是备注掉的。
需要打包的时候可以自行打开