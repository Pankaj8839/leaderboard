const mongoose = require('mongoose');

const playerScoreSchema = new mongoose.Schema({
    playerId: {
        type: String,
        required: true,
        index: true
    },
    region: {
        type: String,
        required: true,
        index: true
    },
    mode: {
        type: String,
        required: true,
        index: true
    },
    score: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create compound index for efficient leaderboard queries
playerScoreSchema.index({ region: 1, mode: 1, score: -1 });

module.exports = mongoose.model('PlayerScore', playerScoreSchema);
