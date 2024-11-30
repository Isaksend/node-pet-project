const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const userRoutes = require('./src/routes/user');
const sequelize = require('./src/config/database');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const dotenv = require('dotenv');
dotenv.config();
if (!process.env.DB_NAME) {
    console.error('Ошибка: файл .env не загружен или переменные среды отсутствуют');
    process.exit(1);
}
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use((req, res, next) => {
    console.log(`Маршрут ${req.method} ${req.originalUrl} был вызван`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('sendMessage', (data) => {
        io.emit('receiveMessage', data);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

sequelize.sync().then(() => {
    server.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});