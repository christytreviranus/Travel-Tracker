//Make edits here and remove comment after done

'use strict';
module.exports = (sequelize, DataTypes) => {
  let AuthToken = sequelize.define('AuthToken', {
    token: DataTypes.STRING
  }, {});
  AuthToken.associate = function(models) {
    // associations can be defined here
    AuthToken.belongsTo(models.User)
  };
  // generates a random 15 character token and
  // associates it with a user
  AuthToken.generate = async function(UserId) {
    if (!UserId) {
      throw new Error('AuthToken requires a user ID')
    }

    let token = '';

    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 15; i++) {
      token += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
    }

    return AuthToken.create({ token, UserId })
  }


  return AuthToken;
};