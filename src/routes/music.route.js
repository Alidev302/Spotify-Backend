const express = require('express');
const musicController = require('../controllers/music.controller');
const multer = require('multer');

const up = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/create-music" , up.single("music"), musicController.createMusic);

module.exports = router;