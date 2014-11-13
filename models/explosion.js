module.exports = function(sequelize, DataTypes) {

    var Explosion = sequelize.define('Explosion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: DataTypes.STRING,
        presentPrice: DataTypes.FLOAT,
        originalPrice: DataTypes.FLOAT,
        imgUrl: DataTypes.STRING,
        buyUrl: DataTypes.STRING,
        discount: DataTypes.INTEGER


    }, {
        tableName: 'explosion',
        timestamps: true,
        associate: function(models) {
            // Explosion.belongsTo(models.Buyer);
            // Explosion.belongsTo(models.Seller);
        }

    });



    return Explosion;
}
