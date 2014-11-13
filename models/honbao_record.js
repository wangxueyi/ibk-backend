module.exports = function(sequelize, DataTypes) {

    var HongbaoRecord = sequelize.define('HongbaoRecord', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        buyerId: DataTypes.INTEGER,
        sellerId: DataTypes.INTEGER,
        title: DataTypes.STRING, //标题
        buyerName: DataTypes.STRING, //买家name
        taobao: DataTypes.STRING, //买家name
        orderNumber: DataTypes.STRING, //订单号
        status: DataTypes.INTEGER, // 活动状态
        // taskType: DataTypes.STRING, // 任务类型
        // region: DataTypes.STRING, //限制地区
        // reward: DataTypes.FLOAT, // 佣金奖励
        // orderPrice: DataTypes.FLOAT, // 垫付金额
        // amount: DataTypes.INTEGER,//总份数
        // remain: DataTypes.INTEGER, //剩余份数
        // timeNeeded: DataTypes.INTEGER, // 任务执行时间
        // maxTime: DataTypes.INTEGER, // 任务执行时间
        // baseRequirement: DataTypes.STRING, //操作要求
        // otherRequirement: DataTypes.STRING //其他要求


    }, {
        tableName: 'hongbao_record', // this will define the table's name
        timestamps: true, // this will deactivate the timestamp columns
        associate: function(models) {
            HongbaoRecord.belongsTo(models.Buyer);
            HongbaoRecord.belongsTo(models.Seller);
        }

    });

    return HongbaoRecord;
}
