const { DataTypes } = require('sequelize');
const sequelize = require('../config/index');

const Marker = sequelize.define('Marker', {
  id_marker: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'Markers',
  timestamps: false
});

module.exports = Marker;
