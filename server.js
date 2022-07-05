require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile('./index.html'));
app.listen(3000, (req, res) => console.log('Server Started...'));
