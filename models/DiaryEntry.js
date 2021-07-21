const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiaryEntrySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    moodRate: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },

})

module.exports = DiaryEntry = mongoose.model('diaryentries', DiaryEntrySchema);