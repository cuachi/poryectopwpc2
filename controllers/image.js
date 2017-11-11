const md5 = require('md5'),
    fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    Models = require('../models');

module.exports = {
    index: (req, res) => {
        var viewModel = {
            r: '/images',
            image: {},
            comments: []
        };

        Models.Image.findOne({
            filename: {
                $regex: req.params.image_id
            }
        }, (err, image) => { 
            if (err) {
                console.log(">Error en la cosutla image/index");
                throw err;
            }
            if (image) {
                image.views = image.views + 1;
                viewModel.image = image;
                image.save();
                Models.Comment.find({
                    image_id: image._id
                }, {}, {
                    sort: {
                        timestamp: 1
                    } 
                }, (err, comments) => {
                    if (err) {
                        console.log(">Error al consultar los comentarios image/index");
                        throw err;
                    }
                    viewModel.comments = comments;
                    sidebar(viewModel, (vm) => {
                        res.render('image', vm);
                    });
                });
            } else {
                res.redirect('/');
            }
        });
    },
    create: (req, res) => {
        var saveImage = () => {
            var dictionary = "qwertyuiopasdfghjklzxcvbnm1234567890"
            var imgUrl = "";
            for (var index = 0; index < 6; index++) {
                imgUrl += dictionary.charAt(
                    Math.floor(Math.random() * dictionary.length)
                );
            };

            Models.Image.find({
                filename: imgUrl
            },(err,images)=>{
                if(images.length>0){
                    saveImage()
                }else{
                    var tempPath = req.files[0].path;
                    var ext = path.extname(req.files[0].originalname).toLowerCase();
                    var targetPath = path.resolve('./public/upload/' + imgUrl + ext);
                    if (ext === ".png" || ext === ".jpg" || ext === ".gif" || ext === ".jpeg") {
                        fs.rename(tempPath, targetPath, (err) => {
                            if (err) {
                                console.log("error al cargar imagen");
                                throw err;
                            }
        
                            var newImg = new Models.Image({
                                uniqueId: imgUrl,
                                title: req.body.title,
                                filename: imgUrl + ext,
                                description: req.body.description
                            });
                            newImg.save((err,image)=>{
                                console.log(image);
                                if(err){
                                    console.log(">Error al salver la img en bd"); 
                                    throw err;
                                };
                            });
        
                            res.redirect(`/images/index/${imgUrl}`)
                        })
                    } else {
                        fs.unlink(tempPath, (err) => {
                            if (err) {
                                console.log("Error al borrar el archivo");
                                throw err;
                            }
                            /*res.status(500).json({
                                error: "Solo se permiten cargar archivos validos"
                            });*/
                        });
                    }
                }
            });
        };
        saveImage();
    },
    like: (req, res) => {
        Models.Image.findOne({
            filename: {$regex: req.params.image_id}
        },(err,img)=>{
            if (err || img == null){
                console.log(img._id);
                console.log(`>Error al buscar imagen: ${req.params.image_id}`);
                throw err;
            }
            img.likes = img.likes + 1;
            img.save((err)=>{
                if (err) {
                    console.log(">Error al salvar like");
                    res.json(err);
                } else {
                    res.json({
                        likes: img.likes
                    });
                }
            });
        });
    },
    comment: (req, res) => {
        Models.Image.findOne({
            filename:{
                $regex: req.params.image_id
            }
        },(err,image)=>{
            if (!err && image){
                var newComment = new Models.Comment(req.body);
                newComment.gravatar = md5(newComment.email);
                newComment.image_id = image._id;
                newComment.save((err,comment)=>{
                    if(err){
                        console.log(">Error al salvar comentario");
                        throw err;
                    }
                    res.redirect('/images/index/'+ image.uniqueId + '#'+ comment._id);
                });
            }else{
                res.redirect('/'); 
            };
        });
    }
};