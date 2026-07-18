const Musicmodel = require("../models/music.model");
const Albummodel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const upload = require("../services/storage.service");

async function createMusic(req, res) {
        const title = req.body.title;
        const file = req.file;

        const result = await upload(file);

        const newMusic = await Musicmodel.create({
            uri: result.url,
            title: title,
            artist: req.user.id
        });
        res.status(201).json({ message: "Music Created", music: newMusic });
    }

async function createAlbum(req, res) {
    const title = req.body.title;
    const musics = req.body.musics;
    const newAlbum = await Albummodel.create({
        title: title,
        musics: musics,
        artist: req.user.id
    });
    res.status(201).json({ message: "Album Created", album: newAlbum });
}

module.exports = { createMusic, createAlbum };