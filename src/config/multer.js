const multer = require('multer');
const path = require('path');

// Local onde os arquivos serão salvos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Garante que a pasta 'uploads/' existe
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // exemplo: 1689272983.jpg
    }
});

const upload = multer({ storage });

module.exports = upload;
