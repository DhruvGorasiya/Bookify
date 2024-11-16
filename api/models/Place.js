const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;