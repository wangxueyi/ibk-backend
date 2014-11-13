module.exports = function(sequelize, DataTypes) {

    var OauthRefreshToken = sequelize.define('OauthRefreshToken', {
        // uid: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        refreshToken: DataTypes.STRING,
        clientId: DataTypes.STRING,
        userId: DataTypes.STRING,
        expires: DataTypes.DATE


    }, {
        tableName: 'oauth_refresh_token', // this will define the table's name
        timestamps: true // this will deactivate the timestamp columns
    });


    return OauthRefreshToken
}
