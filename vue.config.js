// vue.config.js
const path = require('path')

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/css/variables.less'),
            ],
        });
}

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: (config) => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
        config.module.rules.delete("svg");
        config.module.rule('svg-smart').test(/\.svg$/).include.add(resolve('src/icons/svg')).end().use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    devServer: {
        proxy: {
            '/api': {
                // 目标 API 地址
                target: 'http://localhost:9001/',
                // 如果要代理 websockets
                ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
            }
        }
    },
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false
}