/**
 * @file 开发环境客户端
 * @author zqyadam(zqyadam@qq.com)
 */

'use strict';

require('eventsource-polyfill');
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload();
    }
});
