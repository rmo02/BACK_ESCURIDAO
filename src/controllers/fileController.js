const { File, Marker } = require('../model/associations');

exports.createFiles = async (req, res) => {
  try {
      const { id_marker } = req.body;

      // Verifica se o marcador existe
      const markerExists = await Marker.findByPk(id_marker);
      if (!markerExists) {
          return res.status(404).json({ error: 'Marker não encontrado' });
      }

      // Processa os arquivos enviados
      const files = [];
      for (const file of req.files) {
          const filePath = file.path;

          // Cria o arquivo associado ao marcador
          const createdFile = await File.create({
              arquivo: filePath,
              id_marker: id_marker
          });

          files.push(createdFile);
      }

      res.status(201).json({ message: 'Arquivos criados com sucesso' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
      const files = await File.findAll();
      const updatedFiles = files.map(file => ({
          id: file.id,
          arquivo: `${req.protocol}://${req.get('host')}/${file.arquivo.replace(/\\/g, '/')}` // Substitui as barras invertidas por barras normais
      }));

      res.status(200).json(updatedFiles);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getFileById = async (req, res) => {
  try {
      const file = await File.findByPk(req.params.id);
      if (file) {
          const updatedFile = {
              id: file.id,
              arquivo: `${req.protocol}://${req.get('host')}/${file.arquivo.replace(/\\/g, '/')}` // Substitui as barras invertidas por barras normais
          };

          res.status(200).json(updatedFile);
      } else {
          res.status(404).json({ error: 'File not found' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (file) {
      await file.update(req.body);
      res.status(200).json(file);
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (file) {
      await file.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};