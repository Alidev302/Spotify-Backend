const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const musicRoutes = require('./routes/music.route');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/music', musicRoutes);

module.exports = app;