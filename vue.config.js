const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
function resolve(dir) {
    return path.join(__dirname, dir)
}

const glob = require("glob")
const pxtoviewport = require("postcss-px-to-viewport-opt")
const cssnext = require("postcss-cssnext")
const viewportunits = require("postcss-viewport-units")
const aspectratiomini = require("postcss-aspect-ratio-mini")
const writesvg = require("postcss-write-svg")

const pages = {}
let entries
try {
    // 获取相关入口
    entries = glob('src/views/*/index.js', {sync: true})
} catch (err) {
    entries = []
    throw err
}
// 格式化生成入口
entries.forEach((file) => {
    // file字符串为 src/pageShop/.../index.js
    const fileSplit = file.split('/')
    const pageName = fileSplit[2]
    let pageHtml = fileSplit.slice(0, 3).join('/') + '/index.html'
    if (!fs.existsSync(pageHtml)) {
        // 入口如果不配置直接使用 _default.html
        pageHtml = fileSplit.slice(0, 2).join('/') + '/_default.html'
    }
    pages[pageName] = {
        entry: file,
        template: pageHtml,
        filename: `${pageName}.html`
    }
})


module.exports = {
    pages,
    outputDir: process.env.outputDir,
    //去除map
    productionSourceMap: false,
    // 基本路径
    // baseUrl: './',
    configureWebpack: {
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ],

    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@utils', resolve('src/utils'))
            .set('@store', resolve('src/store'))
    },
    css: {
        loaderOptions: {
            css: {
                // options here will be passed to style-loader
            },
            postcss: {
                plugins: [
                    pxtoviewport({
                        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
                        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
                        unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
                        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
                        selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
                        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
                        mediaQuery: false, // 允许在媒体查询中转换`px`
                        exclude: /(\/|\\)(node_modules)(\/|\\)/
                    }),
                    cssnext({
                        preset: "advanced",
                        autoprefixer: false, // 和cssnext同样具有autoprefixer，保留一个
                        "postcss-zindex": false
                    }),
                    viewportunits({}),
                    aspectratiomini({}),
                    writesvg({})
                ]
            }
        }
    }
}
