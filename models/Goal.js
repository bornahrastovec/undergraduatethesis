const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    dateOfPlannedAchievment: {
        type: Date,
        required: true
    },
    how: {
        type: String,
        required: true,
    },
    what: {
        type: String,
        required: true
    },
    why: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = Goal = mongoose.model('goal', GoalSchema);