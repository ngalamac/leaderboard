import './style.css';
import leaderboard from '../modules/leaderboard.js';

// DOM elements
const refreshButton = document.getElementById('refreshButton');
const scoreList = document.getElementById('scoreList');
const addScoreForm = document.getElementById('addScoreForm');
const userNameInput = document.getElementById('userName');
const userScoreInput = document.getElementById('userScore');

// Function to refresh the scores list
const refreshScores = async () => {
  try {
    // Get the scores for the game
    const scores = await leaderboard.getLeaderBoard('YOUR_GAME_ID');

    // Clear the current list
    scoreList.innerHTML = '';

    // Create list items for each score
    scores.result.forEach(score => {
      const listItem = document.createElement('li');
      listItem.textContent = `${score.user}: ${score.score}`;
      scoreList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching scores:', error);
  }
};

// Function to create a new game
const createGame = async () => {
  try {
    const gameName = 'Your Game Name'; // Replace with your desired name for the game
    const gameId = await leaderboard.createGame(gameName);
    return gameId;
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
};

// Function to initialize the app
const initApp = async () => {
  try {
    // Create a new game and get the game ID
    const gameId = await createGame();

    // Event listener for refresh button
    refreshButton.addEventListener('click', () => {
      refreshScores();
    });

    // Event listener for adding score
    addScoreForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Get user input
      const userName = userNameInput.value.trim();
      const userScore = parseInt(userScoreInput.value.trim());

      // Check if inputs are valid
      if (userName === '' || isNaN(userScore)) {
        alert('Please enter a valid name and score.');
        return;
      }

      try {
        // Add the score to the game with the retrieved game ID
        await leaderboard.addScore(gameId, userScore, userName);
        // Refresh the scores list
        refreshScores();
        // Clear the input fields
        userNameInput.value = '';
        userScoreInput.value = '';
      } catch (error) {
        console.error('Error adding score:', error);
      }
    });

    // Initial load - Refresh the scores list
    refreshScores();
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

// Initialize the app
initApp();
