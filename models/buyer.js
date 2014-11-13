module.exports = function(sequelize, DataTypes) {

    var Buyer = sequelize.define('Buyer', {
        // uid: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        // 用户信息
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar: DataTypes.STRING,
        nickName: DataTypes.STRING,
        reward: DataTypes.INTEGER,
        qq: DataTypes.STRING,
        taobao: DataTypes.STRING,
        zhifubao: DataTypes.STRING,
        phone: DataTypes.STRING

    }, {
        tableName: 'buyer', // this will define the table's name
        timestamps: true, // this will deactivate the timestamp columns
        associate: function(models) {
            Buyer.hasMany(models.Hongbao);
            Buyer.hasMany(models.Baoliao);
        }
    });


    return Buyer
}
