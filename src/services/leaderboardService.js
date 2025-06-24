const PlayerScore = require('../models/PlayerScore');

class LeaderboardService {
    // Increment a player's score (or create if not exists)
    async incrementScore(playerId, region, mode, increment = 1) {
        return PlayerScore.findOneAndUpdate(
            { playerId, region, mode },
            { $inc: { score: increment } },
            { upsert: true, new: true }
        );
    }

    // Fetch top N players for a region and mode
    async getTopPlayers(region, mode, limit = 10) {
        return PlayerScore.find({ region, mode })
            .sort({ score: -1 })
            .limit(limit)
            .select('playerId score region mode');
    }

    // Get top players for a specific region and mode
    async getTopPlayers(region, mode, limit = 10) {
        try {
            return await PlayerScore.find({ region, mode })
                .sort({ score: -1 })
                .limit(limit)
                .select('playerId score timestamp');
        } catch (error) {
            throw new Error(`Error fetching top players: ${error.message}`);
        }
    }

    // Update or create a player's score
    async updateScore(playerId, region, mode, score) {
        try {
            const playerScore = await PlayerScore.findOneAndUpdate(
                { playerId, region, mode },
                { score, timestamp: new Date() },
                { upsert: true, new: true }
            );
            return playerScore;
        } catch (error) {
            throw new Error(`Error updating score: ${error.message}`);
        }
    }

    // Get player's rank in a specific region and mode
    async getPlayerRank(playerId, region, mode) {
        try {
            const playerScore = await PlayerScore.findOne({ playerId, region, mode });
            if (!playerScore) return null;

            const rank = await PlayerScore.countDocuments({
                region,
                mode,
                score: { $gt: playerScore.score }
            }) + 1;

            return {
                rank,
                score: playerScore.score,
                timestamp: playerScore.timestamp
            };
        } catch (error) {
            throw new Error(`Error getting player rank: ${error.message}`);
        }
    }
}

module.exports = new LeaderboardService();
