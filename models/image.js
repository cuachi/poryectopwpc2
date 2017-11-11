const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      path = require('path');

var ImageSchema = new Schema({
    uniqueId: {type:String},
    title: {type:String},
    description: {type:String},
    filename: {type:String},
    views: {type:Number, 'default':0},
    likes: {type:Number, 'default':0},
    timestamp: {type: Date, 'default': Date.now()}
});

ImageSchema.virtual('uniqueID').get(()=>{
    return this.filename.replace(path.extname(this.filename),'');
});

module.exports = mongoose.model('Image', ImageSchema);