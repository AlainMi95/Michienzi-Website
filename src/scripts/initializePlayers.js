import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvjkfhezCQMx9FATSC9_yGOXb1bFQJnMg",
  authDomain: "darts-97aa5.firebaseapp.com",
  projectId: "darts-97aa5",
  storageBucket: "darts-97aa5.firebasestorage.app",
  messagingSenderId: "452633817021",
  appId: "1:452633817021:web:212ba23eacf7ac480decd4",
  measurementId: "G-3PM28JVZ6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initialPlayers = [
  {
    name: "Alain",
    games: 0,
    wins: 0,
    averageScore: 0,
    checkoutPercentage: 0
  },
  {
    name: "Player 2",
    games: 0,
    wins: 0,
    averageScore: 0,
    checkoutPercentage: 0
  },
  {
    name: "Player 3",
    games: 0,
    wins: 0,
    averageScore: 0,
    checkoutPercentage: 0
  }
];

const addPlayer = async (playerData) => {
  try {
    const playersRef = collection(db, 'players');
    await addDoc(playersRef, {
      ...playerData,
      createdAt: new Date()
    });
    console.log(`Added player: ${playerData.name}`);
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
};

const initializePlayers = async () => {
  try {
    console.log('Initializing players...');
    for (const player of initialPlayers) {
      await addPlayer(player);
    }
    console.log('Player initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing players:', error);
  }
};

// Run the initialization
initializePlayers();
