# Real-time Leaderboard System

A Node.js backend for a real-time leaderboard using Express, MongoDB (Mongoose), and Socket.io.

## Features

- Real-time leaderboard updates via WebSockets
- Increment player scores and fetch top players by region/mode
- Modular, scalable folder structure

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or remote)

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/leaderboard
   PORT=3000
   ```

### Running the App

- Development: `npm run dev`
- Production: `npm start`

### Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Port for the server (default: 3000)

## Socket.io Events

- `scoreUpdate` (client → server): `{ playerId, region, mode, increment }`
- `fetchTopPlayers` (client → server): `{ region, mode, limit }`
- `leaderboardUpdate` (server → all): `{ region, mode, topPlayers }`
- `topPlayers` (server → client): `{ region, mode, topPlayers }`

---

This project is organized for clarity and scalability. See `src/` for all core logic.
"# leaderboard" 
"# leaderboard" 
