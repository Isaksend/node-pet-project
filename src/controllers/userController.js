const bcrypt = require('bcrypt');
const User= require('../models/User');
const cloudinaryService = require('../services/cloudinaryService');


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

exports.uploadProfilePicture = async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!req.file) {
            return res.status(400).send({ message: 'Файл не был загружен' });
        }

        // Загружаем файл в Cloudinary
        const result = await cloudinaryService.uploadImage.upload(req.file.path, {
            folder: 'isatag',
        });

        // Обновляем URL аватара в базе данных
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ message: 'Пользователь не найден' });
        }

        user.avatarUrl = result.secure_url;
        await user.save();

        res.status(200).send({ avatarUrl: result.secure_url });
    } catch (error) {
        console.error('Ошибка при загрузке фотографии профиля:', error);
        res.status(500).send({ message: 'Ошибка на сервере' });
    }
};

module.exports = { register, login };