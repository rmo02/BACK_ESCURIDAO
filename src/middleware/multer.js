const multer = require('multer');
const path = require('path');

// Defina a função de filtro para aceitar apenas imagens e vídeos
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos de imagem e vídeo são permitidos!'), false);
    }
};

// Defina o local onde os arquivos serão armazenados
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
});

// Configuração do multer para capturar todos os arquivos
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 30, // Limitando os arquivos até 10MB
        files: 3 // Limitando até três arquivos por requisição
    }
}).any(); // Captura todos os arquivos enviados na requisição

module.exports = upload;
