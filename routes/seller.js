var db = require('../models')


exports.userInfo = function(req, res){

    // console.log(req.body);
    // console.log(req.query);
    var accessToken = req.query.access_token;
    db.OauthAccessToken
    .find({
         where: { accessToken: accessToken }
    })
    .on('success', function(data) {
        res.json(data);
    });

};


exports.hongbaoLists = function(req, res){

    db.HongbaoRecord.findAll({
        // where: {isShow: true},
        // order: 'weight ASC',
        attributes: ['title', 'buyerName', 'taobao', 'orderNumber']
    }).on('success', function(data) {


        res.json(data);
    });
};
