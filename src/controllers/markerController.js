const { Marker, File } = require('../model/associations');

exports.createMarker = async (req, res) => {
  try {
    const marker = await Marker.create(req.body);
    res.status(201).json(marker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMarkers = async (req, res) => {
  try {
      const markers = await Marker.findAll({
          include: {
              model: File,
              as: 'files'
          }
      });

      // Ajustando os caminhos dos arquivos para usar barras normais e adicionar o IP
      const updatedMarkers = markers.map(marker => ({
          id_marker: marker.id_marker,
          nome: marker.nome,
          rua: marker.rua,
          bairro: marker.bairro,
          numero: marker.numero,
          cidade: marker.cidade,
          status: marker.status,
          files: marker.files.map(file => ({
              id: file.id,
              arquivo: `${req.protocol}://${req.get('host')}/${file.arquivo.replace(/\\/g, '/')}` // Substitui as barras invertidas por barras normais
          }))
      }));

      res.status(200).json(updatedMarkers);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getMarkerById = async (req, res) => {
  try {
      const marker = await Marker.findByPk(req.params.id, {
          include: {
              model: File,
              as: 'files'
          }
      });

      if (marker) {
          // Ajustando os caminhos dos arquivos para usar barras normais e adicionar o IP
          const updatedMarker = {
              id_marker: marker.id_marker,
              nome: marker.nome,
              rua: marker.rua,
              bairro: marker.bairro,
              numero: marker.numero,
              cidade: marker.cidade,
              status: marker.status,
              files: marker.files.map(file => ({
                  id: file.id,
                  arquivo: `${req.protocol}://${req.get('host')}/${file.arquivo.replace(/\\/g, '/')}` // Substitui as barras invertidas por barras normais
              }))
          };

          res.status(200).json(updatedMarker);
      } else {
          res.status(404).json({ error: 'Marker not found' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.updateMarker = async (req, res) => {
  try {
    const marker = await Marker.findByPk(req.params.id);
    if (marker) {
      await marker.update(req.body);
      res.status(200).json(marker);
    } else {
      res.status(404).json({ error: 'Marker not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMarker = async (req, res) => {
  try {
    const marker = await Marker.findByPk(req.params.id);
    if (marker) {
      await marker.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Marker not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
