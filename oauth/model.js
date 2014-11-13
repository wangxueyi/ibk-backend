var model = module.exports;
var _ = require('underscore'); var db = require('../models')


/*
 * 获取accessToken
 */
model.getAccessToken = function (bearerToken, callback) {

    db.OauthAccessToken
    .find({
         where: { accessToken: bearerToken }
    })
    .on('success', function(data) {
        return callback(false, data.values);
    });
};

/*
 * 获取refreshToken
 */
model.getRefreshToken = function (bearerToken, callback) {

    db.OauthRefreshToken
    .find({
        where: { refreshToken: bearerToken }
    })
    .on('success', function(data) {
      return callback(false, data.values);
    });

};

/*
 * 获取client
 */
model.getClient = function (clientId, clientSecret, callback) {

    if (clientSecret === null) {
        db.OauthClient
        .find({ where: { clientId: clientId } })
        .on('success', function(data) {
            return callback(false, data.values);

        });
    } else {

        db.OauthClient
        .find({ where: { clientId: clientId, clientSecret: clientSecret } })
        .on('success', function(data) {
                return callback(false, data.values);
        });
    }

};

/*
 * client是否有效
 */
model.grantTypeAllowed = function (clientId, grantType, callback) {

    if (grantType === 'password') {

        db.OauthClient
        .find({ where: {clientId: clientId} })
        .on('success', function(data) {

            if(!_.isEmpty(data)) {
                return callback(false, true);
            } else {
                callback(false, false);
            }
        });

    }

};


/*
 * 保存accessToken
 */
model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {

    db.OauthAccessToken.create({
        accessToken: accessToken,
        clientId: clientId,
        userId: userId,
        expires: expires
    }).on('success', function() {
        callback(false);
    });

};

/*
 * 保存refreshToken
 */
model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {

    db.OauthRefreshToken.create({
        refreshToken: refreshToken,
        clientId: clientId,
        userId: userId,
        expires: expires
    }).on('success', function() {
        callback(false);
    });


};

/*
 * 获取用户信息
 */
model.getUser = function (username, password, callback) {

    db.Buyer
    .find({ where: {userName: username, password: password} })
    .on('success', function(user) {

        if(!_.isEmpty(user)) {

            return callback(false, user.id);

        } else {
          callback(false, false);
        }
    });

};
