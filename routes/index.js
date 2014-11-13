var db = require('../models')
var php = require('phpjs');
var fs = require('fs');
var Q = require('q');
var _ = require('underscore');

exports.index = function(req, res){

    var publics = [
        {
            name: '生成红包申请记录',
            url: 'http://api.ibaokuan.net/hongbao_records',
            type: 'POST',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/16abf12bcb9e41728ebab4e74153eb51/'
        },
        {
            name: '更新红包任务记录',
            url: 'http://api.ibaokuan.net/hongbao_records',
            type: 'PATCH',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/fe459e7e3a284f5d9ab1416f7b3a6600/'
        },
        {
            name: '更新单个红包',
            url: 'http://api.ibaokuan.net/hongbaos/:hongbao_id',
            type: 'PATCH',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/b87fb12483fc41b29ebcfd0e0bbe6a2e/'
        },
        {
            name: '单个红包',
            url: 'http://api.ibaokuan.net/hongbaos/:hongbao_id',
            type: 'GET',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/9ce95a22297d4b0ca6516bd8251cfbb7/'
        }

    ];


    var buyers = [
        {
            name: '用户注册',
            url: 'http://api.ibaokuan.net/buyers',
            type: 'POST',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/5f2ec13a6ef041348684c369408797e4/'
        },
        {
            name: '用户登录(通过用户名和密码获取token)',
            url: 'http://api.ibaokuan.net/buyers/authorize',
            type: 'GET',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/5e907ad6c05b4f3b8f0e2eb287f5ffef/'
        },
        {
            name: '用户登录(通过refresh_token获取token)',
            url: 'http://api.ibaokuan.net/buyers/authorize',
            type: 'GET',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/076c6cbd8394484f9a2e2dcfb22227a5/'
        },
        {
            name: '获取用户信息',
            url: 'http://api.ibaokuan.net/buyers/:bid',
            type: 'GET',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/479f295c0f1245f2951a12acae824479/'
        },
        {
            name: '更新用户信息',
            url: 'http://api.ibaokuan.net/buyers/:bid',
            type: 'PATCH',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/c34e98a5f4694e8ea73eef08b7388643/'
        },
        {
            name: '某个用户的红包活动记录',
            url: 'http://api.ibaokuan.net/buyers/:bid/hongbao_records',
            type: 'GET',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/bda426a78b2a408d811cb009cfffbb71/'
        },
        {
            name: '用户添加一个淘宝小号',
            url: 'http://api.ibaokuan.net/buyers/:bid/taobaos',
            type: 'POST',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/434f629daa8c445a85d2dfcb1457a7f5/'
        },
        {
            name: '用户淘宝小号列表',
            url: 'http://api.ibaokuan.net/buyers/:bid/taobaos',
            type: 'GET',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/e86707060d604ba7846fe812866402ec/'
        },
        {
            name: '删除一个淘宝小号',
            url: 'http://api.ibaokuan.net/buyers/:bid/taobaos/taobao_id',
            type: 'DELETE',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/a543fe2027d2401282b7474df57a89bd/'
        },
        {
            name: '更新一个淘宝小号',
            url: 'http://api.ibaokuan.net/buyers/:bid/taobaos/taobao_id',
            type: 'PATCH',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/c7dd1fab3fff40e48b2fe4c1cb69eca5/'
        }

    ];

    var sellers = [
        {
            name: '商家注册',
            url: 'http://api.ibaokuan.net/sellers',
            type: 'POST',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/4beba8cc68e64e39a07bbf36ee751698/'
        },
        {
            name: '商家登录(通过用户名和密码获取token)',
            url: 'http://api.ibaokuan.net/sellers/authorize',
            type: 'GET',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/ea0a624b32554b3bbe8fb56bfa7cbd56/'
        },
        {
            name: '商家登录(通过refresh_token获取token)',
            url: 'http://api.ibaokuan.net/sellers/authorize',
            type: 'GET',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/5fda3a11c8e0498f9932af6d28e8f172/'
        },
        {
            name: '商家创建红包活动',
            url: 'http://api.ibaokuan.net/hongbaos',
            type: 'POST',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/d84ba555008e4cb9b94d44908e9240d7/'
        },
        {
            name: '商家的红包活动申请记录',
            url: 'http://api.ibaokuan.net/sellers/:sid/hongbao_records',
            type: 'GET',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/69e4d8537eb14e898f79aac695834dda/'
        },
        {
            name: '更新商家信息',
            url: 'http://api.ibaokuan.net/sellers/:sid',
            type: 'PATCH',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/b395919b54ab4f35b10430d8d63b4309/'
        },
        {
            name: '获取商家信息',
            url: 'http://api.ibaokuan.net/sellers/:sid',
            type: 'GET',
            detail_url: 'https://tower.im/projects/f36d2393669943619e47cdded84d1ffa/docs/96dc4be66d9a4cc4a3536cd0f60122d3/'
        }

    ];


    res.render('index', {publics: publics, sellers: sellers, buyers: buyers});

};

//爆款
exports.explosions = function(req, res){

    db.Explosion.findAll().on('success', function(data) {
        res.json(data);
    });

};

//爆料
exports.baoliaos = function(req, res){

    db.Baoliao.findAll().on('success', function(data) {
        res.json(data);
    });

};
//类目
exports.categorys = function(req, res){

    db.Category.findAll().on('success', function(data) {
        res.json(data);
    });

};

exports.hongbaos = function(req, res){

    db.Hongbao.findAll().on('success', function(data) {
        res.json(data);
    });

};

// 新增红包
exports.createHongbao = function(req, res){

    res.json('created');

};

// 取的单个红包
exports.getHongbao = function(req, res){

    var id = req.params.hongbao_id;

    db.Hongbao.find({where: {id: id}}).on('success', function(data) {
        res.json(data);
    });

};

exports.topLists = function(req, res){

    db.Buyer.findAll({order: 'reward DESC'}).on('success', function(data) {
        res.json(data);
    });

};


exports.login = function(req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    console.log(userName);
    console.log(password);

    db.Buyer
    .find({ where: {userName: userName, password: password} })
    .on('success', function(user) {
        console.log(user);
        console.log(_.isEmpty(user));
        if(!_.isEmpty(user)) {

            var data = {
                status: 'success',
                accessToken: 'fe254es58555fs5ee25hr5hh55',
                userName: userName
            };


            res.json(data);
        } else {

            var data = {
                status: 'fail'
            };
            res.json(data);
        }
    });

};

/*
 * 获取单个红包信息
 */
exports.getHongbao = function(req, res){

    res.json('getHongbao');

};


/*
 * 更新单个红包信息
 */
exports.updateHongbao = function(req, res){

    res.json('updateHongbao');

};


/*
 * 生成红包记录
 */
exports.createHongbaoRecord = function(req, res){

    res.json('getHongbaoRecords');

};


/*
 * 更新红包记录
 */
exports.updateHongbaoRecord = function(req, res){

    res.json('updateHongbaoRecords');

};
