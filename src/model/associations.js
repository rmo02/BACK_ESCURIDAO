const Marker = require('./Marker');
const File = require('./File');

Marker.hasMany(File, {
  foreignKey: 'id_marker',
  as: 'files',
  constraints: false
});

File.belongsTo(Marker, {
  foreignKey: 'id_marker'
});

module.exports = { Marker, File };
