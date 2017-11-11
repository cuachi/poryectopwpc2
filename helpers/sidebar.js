var statsHelper = require('./statshelper'),
    imagesHelper = require('./imageshelper'),
    commentsHelper= require('./commentshelper'),
    async = require('async');

module.exports = function(vm,cb){
   async.parallel([
       (next)=>{
           statsHelper(next);
       },
       (next)=>{
           imagesHelper.populars(next);
       },
       (next)=>{
           commentsHelper.newest(next);
       },
   ],(err,results)=>{
       vm.sidebar ={
           stats: results[0],
           popular: results[1],
           comments: results[2]
       };
       cb(vm);
   });
};