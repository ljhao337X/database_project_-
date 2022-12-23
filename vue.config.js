module.exports = {

    devServer: {
        host: 'localhost',
        open: true,
        proxy: {
            '/api': {
                target: 'http://6a2zb7.natappfree.cc', // 请求接口地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            "/img": {
                target: 'https://sm.ms',
                changeOrigin: true,
                secure: false,
                headers: {
                    Referer: 'https://sm.ms'
                }
            }
        }
    }
};