// models/user.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');

class User extends Model {}

User.init({
    email: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    username: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

module.exports = User;
