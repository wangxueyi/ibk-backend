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


/*
 *
 */
exports.createSeller = function(req, res){
    res.json('createSeller');
};

/*
 *
 */
exports.sellerAuthorize = function(req, res){
    res.json('sellerAuthorize');
};

/*
 *
 */
exports.createHongbao = function(req, res){
    res.json('createHongbao');
};

/*
 *
 */
exports.getSellerHongbaoRecords = function(req, res){
    res.json('getSellerHongbaoRecords');
};

/*
 *
 */
exports.updateSeller = function(req, res){
    res.json('updateSeller');
};

/*
 *
 */
exports.getSeller = function(req, res){
    res.json('getSeller');
};
