module.exports = function(sequelize, DataTypes) {

    var Seller = sequelize.define('Seller', {
        // uid: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        // 用户信息
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
        store: DataTypes.STRING,
        qq: DataTypes.STRING,
        phone: DataTypes.STRING,
        wangwang: DataTypes.STRING


    }, {
        tableName: 'seller', // this will define the table's name
        timestamps: true, // this will deactivate the timestamp columns
        associate: function(models) {
            Seller.hasMany(models.Hongbao)
        }
    });


    return Seller
}
