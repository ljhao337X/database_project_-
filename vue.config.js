module.exports = {

    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://qyyksg.natappfree.cc', // 请求接口地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};