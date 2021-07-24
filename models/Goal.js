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
    description: {
        type: String,
        required: true,
    },
    shortOverview: {
        type: String,
        required: true
    },
    
});

module.exports = Goal = mongoose.model('goal', GoalSchema);