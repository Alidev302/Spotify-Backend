const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const up = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/create-music" , authMiddleware.authartistMiddleware, up.single("music"), musicController.createMusic);
router.post("/create-album", authMiddleware.authartistMiddleware, musicController.createAlbum);
router.get("/get-all-musics", authMiddleware.authMiddleware, musicController.getAllMusics);
router.get("/get-all-albums", authMiddleware.authMiddleware, musicController.getAllAlbums);

module.exports = router;