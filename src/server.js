require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = express();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const userRoutes = require('../routes/users');
// const router = express.Router();
//app.use('/users', userRoutes);
// app.use(express.static('../public'));
app.use('/.netlify/functions/server', userRoutes);

// router.get('/', (req, res) => res.json({ messsage: 'hello' }));
//app.use('/.netlify/functions/server', router);
//app.listen(3000, (req, res) => console.log('Server Started...'));

module.exports = app;
module.exports.handler = serverless(app);
