const multer = require('multer');
const path = require('path');
// Настроим хранение с указанием допустимых типов файлов и ограничением на размер
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Указывает на папку для хранения загружаемых файлов
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Уникальное имя файла
    },
});

const fileFilter = (req, file, cb) => {
    // Проверяем, является ли файл изображением
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Неподдерживаемый тип файла'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // Максимальный размер 4MB
    },
    fileFilter: fileFilter,
});

module.exports = upload;