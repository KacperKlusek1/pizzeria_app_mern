const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Konfiguracja przechowywania plików
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/lawsuits/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// Filtrowanie plików (tylko PDF)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Tylko pliki PDF są akceptowane!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;