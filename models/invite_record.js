module.exports = function(sequelize, DataTypes) {

    var InviteRecord = sequelize.define('InviteRecord', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        userId: DataTypes.INTEGER,
        invitedUserId: DataTypes.INTEGER,
        invitedNickname: DataTypes.STRING,
        points: DataTypes.INTEGER

    }, {
        tableName: 'invite_record', // this will define the table's name
        timestamps: true,// this will deactivate the timestamp columns
        associate: function(models) {
            InviteRecord.belongsTo(models.User)
        }

    });



    return InviteRecord;
}
