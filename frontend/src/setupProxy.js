const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use( createProxyMiddleware('/product/:id', {
        target:"http://django:4000",
        changeOrigin:true,
        ws: true,
        secure:false
    }) 
    );
    app.use( createProxyMiddleware('/products', {
        target:"http://django:4000",
        changeOrigin:true,
        ws: true,
        secure:false
    }) 
    );
    app.use( createProxyMiddleware('/products/:keyword', {
        target:"http://django:4000",
        changeOrigin:true,
        ws: true,
        secure:false
    }) 
    );
    app.use( createProxyMiddleware('/password/reset/:token', {
        target:"http://django:4000",
        changeOrigin:true,
        ws: true,
        secure:false
    }) 
    );
    app.use( createProxyMiddleware('/process/payment', {
        target:"http://django:4000",
        changeOrigin:true,
        ws: true,
        secure:false
    },) 
    );
    app.use( createProxyMiddleware('/order/:id', {
        target:"http://django:4000",
        changeOrigin:true,
        ws: true,
        secure:false
    },) 
    );
}

