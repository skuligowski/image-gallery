const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('Setup proxy');
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
  );
  app.use(
    '/library',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
  );
};
