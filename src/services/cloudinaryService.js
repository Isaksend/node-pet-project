const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary Config:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const filePath = path.join(__dirname, '..', '..', 'uploads', 'test-image.jpg');

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'isatag'
        });
        console.log('Загрузка прошла успешно:', result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
        throw error;
    }
};

module.exports = { uploadImage };
