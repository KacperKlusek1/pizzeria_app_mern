const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const lawsuitRoutes = require('./routes/lawsuitRoutes');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes')
const messageRoutes = require('./routes/messageRoutes')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/lawsuits', lawsuitRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/reservations', reservationRoutes);
app.use('/api/messages', messageRoutes)

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Połączono z MongoDB');
        var port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`Serwer działa na porcie: ${port}`);
        });
    })
    .catch(err => console.error(err));
