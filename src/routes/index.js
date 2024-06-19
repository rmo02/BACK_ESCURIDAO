const express = require('express');
const router = express.Router();

const upload = require('../middleware/multer');
const markerController = require('../controllers/markerController');
const fileController = require('../controllers/fileController');


// Marker routes
router.post('/markers', markerController.createMarker);
router.get('/markers', markerController.getAllMarkers);
router.get('/markers/:id', markerController.getMarkerById);
router.put('/markers/:id', markerController.updateMarker);
router.delete('/markers/:id', markerController.deleteMarker);

// File routes
router.post('/files', upload, fileController.createFiles);
router.get('/files', fileController.getAllFiles);
router.get('/files/:id', fileController.getFileById);
router.put('/files/:id', fileController.updateFile);
router.delete('/files/:id', fileController.deleteFile);

module.exports = router;
