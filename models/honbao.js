module.exports = function(sequelize, DataTypes) {

    var Hongbao = sequelize.define('Hongbao', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        buyerId: DataTypes.INTEGER,
        sellerId: DataTypes.INTEGER,
        title: DataTypes.STRING, //标题
        orderPlatform: DataTypes.STRING, //任务平台
        deviceType: DataTypes.STRING, // 设备类型
        taskType: DataTypes.STRING, // 任务类型
        region: DataTypes.STRING, //限制地区
        reward: DataTypes.FLOAT, // 佣金奖励
        orderPrice: DataTypes.FLOAT, // 垫付金额
        amount: DataTypes.INTEGER,//总份数
        remain: DataTypes.INTEGER, //剩余份数
        timeNeeded: DataTypes.INTEGER, // 任务执行时间
        maxTime: DataTypes.INTEGER, // 任务执行时间
        baseRequirement: DataTypes.STRING, //操作要求
        otherRequirement: DataTypes.STRING //其他要求


    }, {
        tableName: 'hongbao', // this will define the table's name
        timestamps: true, // this will deactivate the timestamp columns
        associate: function(models) {
            Hongbao.belongsTo(models.Buyer);
            Hongbao.belongsTo(models.Seller);
        }

    });

    return Hongbao;
}
