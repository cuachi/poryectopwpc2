const path= require('path'),
    ejs = require('ejs-locals'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    multer = require('multer'),
    expressLayouts = require('express-ejs-layouts');

var routes = require('./routes');

module.exports = function(app){

    app.locals.timeago = (timestamp)=>{
        return moment(timestamp).startOf('minutes').fromNow();
    }

    var mainLayout = app.get('depmode') === 'local'? 'main-local':'main';

    app.set('view engine', 'ejs');
    app.set('layout', `layouts/${mainLayout}`);
    
app.use(expressLayouts);
    
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('secret'));

    app.use(multer({
        dest: path.join(__dirname,'../public/upload/temp')
    }).any());

    app = routes(app);

    app.use('/public/', express.static(path.join(__dirname,'../public')));

    if(app.get('env')==='development'){
        app.use(errorHandler());
    }

    return app;
}