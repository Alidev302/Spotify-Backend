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

async function getAllMusics(req, res) {
    const musics = await Musicmodel.find().populate('artist', " username email");
    res.status(200).json({ message: "All Musics", musics: musics });
}

async function getAllAlbums(req, res) {
    const albums = await Albummodel.find().select('title artist').populate('artist', " username email");
    res.status(200).json({ message: "All Albums", albums: albums });
}

async function getAlbumById(req, res) {
    const albumId = req.params.id;
    const album = await Albummodel.findById(albumId).populate('musics', 'title uri').populate('artist', 'username email');
    res.status(200).json({ message: "Album Found", album: album });
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };