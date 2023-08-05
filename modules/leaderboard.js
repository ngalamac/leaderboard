// Leaderboard API service endpoint
const leaderboardAPI = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';

// Create the leaderboard module
const leaderboard = {
  // Function to create a new game
  createGame: async (gameName) => {
    try {
      const response = await fetch(`${leaderboardAPI}games/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: gameName,
        }),
      });
      const data = await response.json();
      return data.result; // Return the game ID
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  },

  // Function to get the leaderboard scores for a game
  getLeaderBoard: async (gameId) => {
    try {
      const response = await fetch(`${leaderboardAPI}games/${gameId}/scores/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting leaderboard scores:', error);
      throw error;
    }
  },

  // Function to add a score to a game
  addScore: async (gameId, score, name) => {
    try {
      const response = await fetch(`${leaderboardAPI}games/${gameId}/scores/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          user: name,
          score: score,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding score:', error);
      throw error;
    }
  },
};

export default leaderboard;
