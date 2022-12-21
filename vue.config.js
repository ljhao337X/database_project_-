

module.exports = {

    devServer: {
        proxy: {
            '/api': {
                target: 'http://n8xdby.natappfree.cc', // 请求接口地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
};