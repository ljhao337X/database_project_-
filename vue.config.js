module.exports = {

    devServer: {
        host: 'localhost',
        open: true,
        proxy: {
            '/api': {
                target: 'http://pn3ykc.natappfree.cc', // 请求接口地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};