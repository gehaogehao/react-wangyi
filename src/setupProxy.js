const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/4000',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite:{
        "^/4000":""
    }
    })
  );
  app.use(
    '/5000',
    createProxyMiddleware({
      target: 'https://m.you.163.com',
      changeOrigin: true,
      pathRewrite:{
        "^/5000":""
    }
    })
  );
};