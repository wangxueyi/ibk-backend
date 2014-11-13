module.exports = function(sequelize, DataTypes) {

    var WallSetting = sequelize.define('WallSetting', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: DataTypes.STRING,
        intro: DataTypes.STRING,
        weight: DataTypes.INTEGER,
        wid: DataTypes.INTEGER,
        isOpened: DataTypes.BOOLEAN
    }, {
        tableName: 'wall_setting',
        timestamps: false
    });



    return WallSetting;
}
