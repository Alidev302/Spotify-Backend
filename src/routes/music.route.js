const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const up = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/create-music" , authMiddleware, up.single("music"), musicController.createMusic);
router.post("/create-album", authMiddleware, musicController.createAlbum);

module.exports = router;