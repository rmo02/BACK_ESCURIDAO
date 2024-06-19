const { DataTypes } = require('sequelize');
const sequelize = require('../config/index');


const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  arquivo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Files',
  timestamps: false
});

module.exports = File;
