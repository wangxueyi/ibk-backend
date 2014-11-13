module.exports = function(sequelize, DataTypes) {

    var OauthClient = sequelize.define('OauthClient', {
        // uid: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        clientId: DataTypes.STRING,
        clientSecret: DataTypes.STRING,
        redirectUri: DataTypes.STRING


    }, {
        tableName: 'oauth_client', // this will define the table's name
        timestamps: true // this will deactivate the timestamp columns
    });


    return OauthClient
}
