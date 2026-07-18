const express = require('express');
const musicController = require('../controllers/music.controller');
console.log("musicController keys:", Object.keys(musicController));
const multer = require('multer');

const up = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/create-music" , up.single("music"), musicController.createMusic);
router.post("/create-album", musicController.createAlbum);

module.exports = router;