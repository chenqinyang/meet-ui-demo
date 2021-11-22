const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '^/test/**',
        createProxyMiddleware(
            {
                target: 'https://investments.personal-banking.hsbc.com.cn',
                pathRewrite: {
                    '^/test/': '/'
                },
                changeOrigin: true,
                secure: false
            }
        )
    )
}