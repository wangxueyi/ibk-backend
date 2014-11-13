module.exports = function(sequelize, DataTypes) {

    var TaskType = sequelize.define('TaskType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: DataTypes.STRING,
        intro: DataTypes.STRING,
        point: DataTypes.INTEGER,
        isDone: DataTypes.BOOLEAN,
        isShow: DataTypes.BOOLEAN,
        weight: DataTypes.INTEGER
    }, {
        tableName: 'task_type',
        timestamps: false
    });



    return TaskType;
}
