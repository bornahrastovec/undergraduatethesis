const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    mood: {
        type: String,
        required: true
    }
})

module.exports = Mood = mongoose.model('mood', MoodSchema);