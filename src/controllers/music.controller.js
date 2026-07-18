const Musicmodel = require("../models/music.model");
const Albummodel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const upload = require("../services/storage.service");

async function createMusic(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (decode.role !== "artist") {
            return res.status(403).json({ message: 'you are not an artist' });
        }
        const title = req.body.title;
        const file = req.file;

        const result = await upload(file);

        const newMusic = await Musicmodel.create({
            uri: result.url,
            title: title,
            artist: decode.id
        });
        res.status(201).json({ message: "Music Created", music: newMusic });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createAlbum(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (decode.role !== "artist") {
            return res.status(403).json({ message: 'you are not an artist' });
        }
        const title = req.body.title;
        const musics = req.body.musics;
        const newAlbum = await Albummodel.create({
            title: title,
            musics: musics,
            artist: decode.id
        });
        res.status(201).json({ message: "Album Created", album: newAlbum });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createMusic, createAlbum };