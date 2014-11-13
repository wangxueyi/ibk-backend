module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('User', {
        // uid: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        // 用户信息
        nickname: DataTypes.STRING,
        realname: DataTypes.STRING,
        avatar: DataTypes.INTEGER,
        phone: DataTypes.STRING,
        alipay: DataTypes.STRING,
        qq: DataTypes.STRING,

        //邀请相关
        inviteCode: DataTypes.STRING,
        fartherInviteCode: DataTypes.STRING,

        // 积分相关
        taskPoints: DataTypes.INTEGER,
        signPoints: DataTypes.INTEGER,
        invitePoints: DataTypes.INTEGER,
        bonusPoints: DataTypes.INTEGER,
        totalPoints: DataTypes.INTEGER,
        expensePoints: DataTypes.INTEGER,

        // 设备信息
        platform: DataTypes.STRING,
        deviceId: DataTypes.STRING,
        ip: DataTypes.STRING,

        // 状态相关
        isInstalled: DataTypes.BOOLEAN,
        isInvited: DataTypes.BOOLEAN,
        isSigned: DataTypes.BOOLEAN,
        lastSignTime: DataTypes.DATE,

        // iOS和Android共有
        mac: DataTypes.STRING,

        // iOS信息
        ser: DataTypes.STRING,
        idfv: DataTypes.STRING,
        idfa: DataTypes.STRING,

        // Android信息
        ei: DataTypes.STRING,
        si: DataTypes.STRING,
        androidId: DataTypes.STRING,
        packageName: DataTypes.STRING

    }, {
        tableName: 'user', // this will define the table's name
        timestamps: true, // this will deactivate the timestamp columns
        associate: function(models) {
            //User.hasMany(models.Apps, {foreignKey: 'fori'})
            //User.hasMany(models.Apps, {foreignKey : 'user_id'})
              User.hasMany(models.SignRecord),
              User.hasMany(models.OrderRecord),
              User.hasMany(models.InstallRecord),
              User.hasMany(models.InviteRecord)
        }
    });


    return User
}
