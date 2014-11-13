var db = require('../models')
var php = require('phpjs');
var fs = require('fs');
var Q = require('q');

/*
*  生成自动登录地址
*  通过此方法生成的地址，可以让用户免登陆，进入积分兑换商城
*/
function buildCreditAutoLoginRequest(appKey, appSecret, uid, credits){


    function sign(params) {


        var str = ''; //待签名字符串

        params = php.ksort(params);

        for(var p in params) {

            str = str + params[p];
        }
        return php.md5(str);

    };


    var url = 'http://www.duiba.com.cn/autoLogin/autologin?';
    var timestamp = (new Date()).valueOf();

    var params = {
      uid: uid,
      credits: credits,
      appSecret: appSecret,
      appKey: appKey,
      timestamp: timestamp

    }

    var sign = sign(params);


    url = url + 'timestamp=' + timestamp + '&uid=' + uid + '&credits=' + credits + '&appKey=' + appKey + '&sign=' + sign;

    return url;
}




exports.index = function(req, res){

    db.User
    .find({
        where: {id: 62}
    })
    .done(function(err, user) {

        var url = buildCreditAutoLoginRequest("3JHH943YqZX7fjwi3X63Ljw7yvbF", "rzvNuqCMxJGo5HWTeXHEWHinNLF", 62, user.totalPoints - user.expensePoints);

        res.render('index', {
            title: 'Express',
            url: url,
            user: user.nickname
        });


    });

    /*

    var promises = Q.nfcall(db.User.find({where: {id: 62}}).on, 'success');
    promises.then(function(user) {

        var url = buildCreditAutoLoginRequest("3JHH943YqZX7fjwi3X63Ljw7yvbF", "rzvNuqCMxJGo5HWTeXHEWHinNLF", 62, user.totalPoints - user.expensePoints);

        res.render('index', {
            title: 'Express',
            url: url,
            user: user.nickname
        });


    })


    */


};



exports.test = function(req, res){

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");

    res.send('chen');

    function step1(a1, callback) {
        console.log(a1);
        callback();

    }

    function step2(a2, callback) {
        console.log(a2);
        callback();

    }
    function step3(a3, callback) {
        console.log(a3);
        callback();

    }
    function step4(a4, callback) {
        console.log(a4);
        callback();

    }

    step1('a1', function(){

        step2('a2', function(){
            setTimeout(function() {
                console.log('test');
            }, 1000);

            step4('a4', function(){

                step4('a4', function(){

                    console.log('aaaaaaaaaaaaaaaaaaaaa');

                });

            });

        });
    });


    Q.nfcall(step1, 'b1')
    .then(Q.nfcall(step2, 'b2'))
    .then(Q.nfcall(step3, 'b3'))
    .then(Q.nfcall(step4, 'b4'))
    .then(function() {
        console.log('bbbbbbbbbbbbbbbbbbbb');
    });


    // 闭包模式
    Q.nfcall(step1, 'b1')
    .then(
        Q.nfcall(step2, 'b2')
        .then(
            Q.nfcall(step3, 'b3')
            .then(
                Q.nfcall(step4, 'b4')
                    .then(function() {
                        console.log('bbbbbbbbbbbbbbbbbbbb');
                    }
                    )
            )
        )
    )



    // use defer
    var step1_deferred = function(a1){
        var deferred = Q.defer();
        step1(a1, function(){
            if(false){
                deferred.reject();
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

    // use defer
    var step2_deferred = function(a2){
        var deferred = Q.defer();
        step2(a2, function(){
            if(false){
                deferred.reject();
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    };
    // use defer
    var step3_deferred = function(a3){
        var deferred = Q.defer();
        step1(a3, function(){
            if(false){
                deferred.reject();
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
    // use defer
    var step4_deferred = function(a4){
        var deferred = Q.defer();
        step1(a4, function(){
            if(false){
                deferred.reject();
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    step1_deferred('c1')
    .then(step2_deferred('c2'))
    .then(step3_deferred('c3'))
    .then(step4_deferred('c4'))
    .then(function() {
        console.log('cccccccccccccccccccccc');
    });


    //================================================

    var file = __dirname + '/test.json';
    var encoding = 'utf-8';

    //use Qnfcall
    var fsReadFile = Q.nfcall(fs.readFile, file, encoding);

    fsReadFile.then(function(data){
        console.log(data);
    },function(err){
        console.log(err);
    }
    );


    var fsReadFile_denodeify = Q.denodeify(fs.readFile);

    fsReadFile_denodeify(file,encoding).then(function(data){
        console.log(data);
    },function(error){
        console.log(err);

    });


    // use defer
    var fsReadFile_deferd = function(file,encoding){
        var deferred = Q.defer();
        fs.readFile(file,encoding,function(error,result){
            if(error){
                deferred.reject(error);
            }
            deferred.resolve(result);
        });

        return deferred.promise;
    };

    fsReadFile_deferd(file, encoding).then(function(data){
        console.log(data);
    },function(error){
        console.log(err);
    });




};
