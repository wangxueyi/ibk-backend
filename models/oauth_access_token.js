module.exports = function(sequelize, DataTypes) {

    var OauthAccessToken = sequelize.define('OauthAccessToken', {
        // uid: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        accessToken: DataTypes.STRING,
        clientId: DataTypes.STRING,
        userId: DataTypes.STRING,
        expires: DataTypes.DATE


    }, {
        tableName: 'oauth_access_token', // this will define the table's name
        timestamps: true // this will deactivate the timestamp columns
    });


    return OauthAccessToken
}
