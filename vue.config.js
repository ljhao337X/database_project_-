module.exports = {

    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://d2v2wr.natappfree.cc', // 请求接口地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};