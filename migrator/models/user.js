// models/user.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize'; // Your sequelize configuration

class User extends Model {}

User.init({
    email: DataTypes.STRING,
    isEditor: DataTypes.BOOLEAN,
}, { sequelize, modelName: 'user' });

export default User;