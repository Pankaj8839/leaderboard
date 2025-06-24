const leaderboardService = require('../services/leaderboardService');

// Initialize Socket.io event handlers
function initializeSocket(io) {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        // Listen for scoreUpdate event
        socket.on('scoreUpdate', async ({ playerId, region, mode, increment = 1 }) => {
            try {
                // Increment player's score
                const updated = await leaderboardService.incrementScore(playerId, region, mode, increment);
                // Broadcast updated leaderboard to all clients in the same region/mode
                const topPlayers = await leaderboardService.getTopPlayers(region, mode, 10);
                io.emit('leaderboardUpdate', { region, mode, topPlayers });
            } catch (err) {
                socket.emit('error', { message: err.message });
            }
        });

        // Listen for fetchTopPlayers event
        socket.on('fetchTopPlayers', async ({ region, mode, limit = 10 }) => {
            try {
                const topPlayers = await leaderboardService.getTopPlayers(region, mode, limit);
                socket.emit('topPlayers', { region, mode, topPlayers });
            } catch (err) {
                socket.emit('error', { message: err.message });
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

module.exports = initializeSocket;
