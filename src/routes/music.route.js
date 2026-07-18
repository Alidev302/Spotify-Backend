const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const up = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/create-music" , authMiddleware.authartistMiddleware, up.single("music"), musicController.createMusic);
router.post("/create-album", authMiddleware.authartistMiddleware, musicController.createAlbum);
router.get("/get-all-musics", authMiddleware.authuserMiddleware, musicController.getAllMusics);
router.get("/get-all-albums", authMiddleware.authuserMiddleware, musicController.getAllAlbums);
router.get("/get-album/:id", authMiddleware.authuserMiddleware, musicController.getAlbumById);

module.exports = router;