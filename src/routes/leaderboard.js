const express = require('express');
const router = express.Router();
const leaderboardService = require('../services/leaderboardService');
const validateScoreUpdate = require('../validators/scoreValidator');
// Get top players for a region and mode
router.get('/:region/:mode', async (req, res) => {
    try {
        
        const { region, mode } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const topPlayers = await leaderboardService.getTopPlayers(region, mode, limit);
        res.json(topPlayers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get player rank
router.get('/:region/:mode/player/:playerId', async (req, res) => {
    try {
        const { region, mode, playerId } = req.params;
        const rankData = await leaderboardService.getPlayerRank(playerId, region, mode);
        if (!rankData) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(rankData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update player score (for testing without WebSocket)
router.post('/update-score', async (req, res) => {
    if (!validateScoreUpdate(req, res)) return;

    try {
        const { playerId, region, mode, score } = req.body;

        const updatedScore = await leaderboardService.updateScore(
            playerId,
            region,
            mode,
            score
        );

        console.log(`Updated score for player ${playerId} in region ${region} and mode ${mode}:`, updatedScore);
        res.json(updatedScore);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


