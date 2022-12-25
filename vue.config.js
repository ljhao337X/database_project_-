module.exports = {

    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://n2pncs.natappfree.cc', // 请求接口地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};