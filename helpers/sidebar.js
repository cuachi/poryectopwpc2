var statsHelper = require('./statshelper'),
    imagesHelper = require('./imageshelper'),
    commentsHelper= require('./commentshelper');

module.exports = function(vm,cb){
   vm.sidebar={
        stats: statsHelper(),
        popular: imagesHelper.populars(),
        commnets: commentsHelper.newest()
    };
    cb(vm);
};