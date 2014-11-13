module.exports = function(sequelize, DataTypes) {

    var SignRecord = sequelize.define('SignRecord', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        userId: DataTypes.INTEGER,
        points: DataTypes.INTEGER
    }, {
        tableName: 'sign_record', // this will define the table's name
        timestamps: true, // this will deactivate the timestamp columns
        associate: function(models) {
            SignRecord.belongsTo(models.User)
        }
    });



    return SignRecord;
}
