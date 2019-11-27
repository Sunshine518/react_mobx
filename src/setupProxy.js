const proxy = require('http-proxy-middleware');

//中间代理，用于后台将请求转发给其它服务器

module.exports = function (app) {
    app.use(proxy('/api', {
        target: "http://apii.aonestep.com",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api": ""
        }
    }));
};