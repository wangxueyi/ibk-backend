module.exports = function(sequelize, DataTypes) {

    var Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING

    }, {
        tableName: 'category',
        timestamps: false
    });

    return Category
}
