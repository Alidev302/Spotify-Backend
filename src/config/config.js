const dotenv = require('dotenv');

dotenv.config();

const config = {
    DB_KEY: process.env.DB_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
};

module.exports = config;