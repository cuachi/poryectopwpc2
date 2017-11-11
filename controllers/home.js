var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image;

module.exports = {
    index: (req, res) => {
        var viewModel = {
            r: '/',
            images: [],
            sidebar: [],
            populars: [],
            sidebars: []
        };
        ImageModel.find({}, {}, {
            sort: {
                timestamp: -1
            }
        }, function (err, images) {
            if (err) {
                console.log(">Error en consulta home/index");
                throw err;
            }
            viewModel.images = images;
            sidebar(viewModel, (vm) => {
                console.log(vm);
                res.render('index', vm);
            });
        });
    }
};