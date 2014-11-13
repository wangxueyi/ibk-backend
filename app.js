
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/buyer');
var seller = require('./routes/seller');
var oauthModel = require('./oauth/model.js');
var http = require('http');
var path = require('path');
var php = require('phpjs');
var bodyParser = require('body-parser');
var oauthserver = require('oauth2-server');


var app = express();


// parse application/x-www-form-urlencoded:w
//
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// memory
app.oauth = oauthserver({
  model: oauthModel,
  // grants: ['password','refresh_token'],
  grants: ['password'],
  debug: true
});



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//设置跨域访问
app.all('*', function(req, res, next) {

    // cros
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers: x-requested-with");

    next();
});



app.post('/oauth/token', app.oauth.grant(), function(req, res) {
// app.all('/oauth/token', function(req, res) {


    // headers: {
    //         "Content-Type": 'application/json',
    //         "Content-Length": data.length
    // }
    // res.set({
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // });
    //



    res.send('chen');
});

app.get('/', routes.index);

app.get('/user-info', app.oauth.authorise(), user.userInfo);
app.get('/explosions', routes.explosions);
app.get('/baoliaos', routes.baoliaos);
app.get('/hongbaos', routes.hongbaos);
app.get('/categorys', routes.categorys);
app.get('/top-lists', routes.topLists);
app.post('/login', routes.login);

//=public
app.get('/hongbaos/:hongbao_id', routes.getHongbao);
app.patch('/hongbaos/:hongbao_id', routes.updateHongbao);

app.post('/hongbao_records', routes.createHongbaoRecord);
app.patch('/hongbao_records', routes.updateHongbaoRecord);


//=buyer
app.post('/buyers', routes.createBuyer);
app.get('/buyers/authorize', routes.buyerAuthorize);
app.patch('/buyers/:bid', routes.updateBuyer);
app.get('/buyers/:bid', routes.getBuyer);

app.get('/buyers/:bid/hongbao_records', routes.getBuyerHongbaoRecords);

app.post('/buyers/:bid/taobaos', routes.createTaobao);
app.get('/buyers/:bid/taobaos', routes.getTaobaos);
app.patch('/buyers/:bid/taobaos/taobao_id', routes.updateTaobao);
app.delete('/buyers/:bid/taobaos/taobao_id', routes.deleteTaobao);


//=seller
app.post('/hongbaos', routes.createHongbao);
app.get('/hongbao-lists', seller.hongbaoLists);




// app.post('/user-info', app.oauth.authorise(), user.userInfo);

app.use(app.oauth.errorHandler());



// app.get('/', routes.index);
// app.get('/users', user.list);
// app.get('/chen', user.chen);
// app.post('/test', routes.test);

app.listen(3000);
