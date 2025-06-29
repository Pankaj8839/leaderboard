const express = require('express');
const cors = require('cors');
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Routes
app.use('/api/leaderboard', leaderboardRoutes);

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
