const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();
const upload = require('../middleware/upload');
const userController = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.post('/upload-profile-picture', upload.single('profilePicture'), userController.uploadProfilePicture);

module.exports = router;