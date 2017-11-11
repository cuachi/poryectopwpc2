var express = require('express'),
    router = express.Router();

var homeControllers = require('../controllers/home'),
    imageControllers = require('../controllers/image');
module.exports = function(app){

    router.get(['/','/home','/home/index'],homeControllers.index);
    router.get('/index',homeControllers.index);
    router.get('/images/index/:image_id',imageControllers.index);

    router.post('/images/create',imageControllers.create);
    router.post('/images/like/:image_id',imageControllers.like);
    router.post('/images/comment/:image_id',imageControllers.comment);

    app.use(router);
    return app;
}