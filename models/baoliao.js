module.exports = function(sequelize, DataTypes) {

    var Baoliao = sequelize.define('Baoliao', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        buyerId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        loveCount: DataTypes.INTEGER,
        presentPrice: DataTypes.FLOAT,
        originalPrice: DataTypes.FLOAT,
        imgUrl: DataTypes.STRING,
        buyUrl: DataTypes.STRING


    }, {
        tableName: 'baoliao',
        timestamps: true,
        associate: function(models) {
            Baoliao.belongsTo(models.Buyer);
        }

    });



    return Baoliao;
}
