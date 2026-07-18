const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',   
}],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',}
});

const Albummodel = mongoose.model('Albums', albumSchema);

module.exports = Albummodel;
