var db = require('../models')

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.chen = function(req, res){
  res.render('chen', { name: 'chen'});
};

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

/*
 * 用户注册
 */
exports.createBuyer = function(req, res){

    res.json('createBuyer');

};


/*
 * 用户登录
 */
exports.buyerAuthorize = function(req, res){

    res.json('buyerAuthorize');

};


/*
 * 更新用户
 */
exports.updateBuyer = function(req, res){

    res.json('updateBuyer');

};


/*
 * 获取用户
 */
exports.getBuyer = function(req, res){

    res.json('getBuyer');

};


/*
 * 获取用户的红包记录
 */
exports.getBuyerHongbaoRecords = function(req, res){

    res.json('getBuyerHongbaoRecords');

};


/*
 * 用户添加一个淘宝帐号
 */
exports.createTaobao = function(req, res){

    res.json('createTaobao');

};


/*
 * 获取淘宝帐号列表
 */
exports.getTaobaos = function(req, res){

    res.json('getTaobaos');

};


/*
 * 更新淘宝帐号
 */
exports.updateTaobao = function(req, res){

    res.json('updateTaobao');

};


/*
 * 获取用户的红包记录
 */
exports. = function(req, res){

    res.json('');

};
