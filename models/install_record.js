module.exports = function(sequelize, DataTypes) {

    var InstallRecord = sequelize.define('InstallRecord', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        userId: DataTypes.INTEGER,
        orderId: DataTypes.STRING,
        adName: DataTypes.STRING,
        device: DataTypes.STRING,
        channel: DataTypes.INTEGER,
        points: DataTypes.INTEGER,
        isBonus: DataTypes.BOOLEAN,
        bonusPoints: DataTypes.INTEGER,
        wid: DataTypes.INTEGER,
        adPlatform: DataTypes.STRING,
        osPlatform: DataTypes.STRING

    }, {
        tableName: 'install_record', // this will define the table's name
        timestamps: true,// this will deactivate the timestamp columns
        associate: function(models) {
            InstallRecord.belongsTo(models.User)
        }

    });



    return InstallRecord;
}
