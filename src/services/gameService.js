import { db } from '../firebase/config';
import { 
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  limit
} from 'firebase/firestore';

export const saveGame = async (gameData) => {
  try {
    const gamesRef = collection(db, 'games');
    await addDoc(gamesRef, {
      ...gameData,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error saving game:', error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const playersRef = collection(db, 'players');
    const q = query(playersRef, orderBy('wins', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    throw error;
  }
};

export const getGames = async (limit = 10) => {
  try {
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, orderBy('timestamp', 'desc'), limit(limit));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting games:', error);
    throw error;
  }
};
