const dotenv = require('dotenv');
dotenv.config(); // Этот вызов должен быть в самом начале

const cloudinary = require('cloudinary').v2;

// Конфигурация Cloudinary
cloudinary.config({
    cloud_name: 'dxa6i8ps5',
    api_key: '589452357843839',
    api_secret: 'g6f4rkVRsNaAtVy5WYWreb_recs',
});


// Проверка, чтобы убедиться, что переменные загружены
console.log('Cloudinary Config:', cloudinary.config());

// Функция для загрузки изображения
const uploadTestImage = async () => {
    try {
        const result = await cloudinary.uploader.upload('./uploads/test-image.jpg', {
            folder: 'isatag',
        });
        console.log('Загрузка прошла успешно:', result.secure_url);
    } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
    }
};

uploadTestImage();
