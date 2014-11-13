var fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    Sequelize = require('sequelize'),
    lodash = require('lodash'),
    sequelize = new Sequelize('xiaoqianbao', 'xiaoqianbao', 'xiaoqianbao', {
        host: 'xiaoqianbao.mysql.rds.aliyuncs.com',
        port: '3306',
        dialect: 'mysql',
        define: {
            underscored: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        timezone: '+08:00'
    }),
    db = {};


// 把所有model存在db中
fs
    .readdirSync(__dirname)
    .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
})
    .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
});

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
})

/*
module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db)
*/
module.exports = db;
