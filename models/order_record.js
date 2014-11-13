module.exports = function(sequelize, DataTypes) {

    var OrderRecord = sequelize.define('OrderRecord', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        userId: DataTypes.INTEGER,
        bizId: DataTypes.STRING,
        orderNum: DataTypes.STRING,
        credits: DataTypes.INTEGER,
        type: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        facePrice: DataTypes.INTEGER,
        actualPrice: DataTypes.INTEGER,
        alipay: DataTypes.STRING,
        phone: DataTypes.STRING,
        qq: DataTypes.STRING,
        status: DataTypes.STRING,
        waitAudit: DataTypes.BOOLEAN,
        ip: DataTypes.STRING
    }, {
        tableName: 'order_record', // this will define the table's name
        timestamps: true, // this will deactivate the timestamp columns
        associate: function(models) {
            OrderRecord.belongsTo(models.User)
        }
    });



    return OrderRecord;
}
