const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function (app) {
    console.log('Setup proxy');
    app.use(
        '/login',
        createProxyMiddleware({
            target: 'https://github.com',
            changeOrigin: true,
            // onProxyReq: function (request) {
            //     request.setHeader("Origin",
            //         "https://github.com");
            // },
        })
    );
    app.use(
        '/user',
        createProxyMiddleware({
            target: 'https://api.github.com',
            changeOrigin: true,
        })
    );
};