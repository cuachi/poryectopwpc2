const models = require('../models');

module.exports = {
    populars: function(callback){
        models.Image.find({},{},{
            limit: 9,
            sort:{
                likes: -1
            }
        }, (err, images)=>{
            if(err) throw err;
            callback(null, images);
        });
    }
}