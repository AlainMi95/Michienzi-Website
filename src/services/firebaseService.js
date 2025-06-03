import { db } from '../firebase/config';
import { 
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  updateDoc,
  doc
} from 'firebase/firestore';

export const getLeaderboard = async (limit = 10) => {
  try {
    const playersRef = collection(db, 'players');
    const q = query(playersRef, orderBy('averageScore', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).slice(0, limit);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    throw error;
  }
};

export const addPlayer = async (playerData) => {
  try {
    const playersRef = collection(db, 'players');
    await addDoc(playersRef, {
      ...playerData,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
};

export const updatePlayer = async (playerData) => {
  try {
    const playersRef = collection(db, 'players');
    await updateDoc(doc(playersRef, playerData.id), {
      ...playerData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating player:', error);
    throw error;
  }
};

export const getPlayerStats = async (playerName) => {
  try {
    const playersRef = collection(db, 'players');
    const q = query(playersRef, where('name', '==', playerName));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const playerData = querySnapshot.docs[0].data();
    return {
      ...playerData,
      winRate: playerData.games > 0 ? (playerData.wins / playerData.games) * 100 : 0
    };
  } catch (error) {
    console.error('Error getting player stats:', error);
    throw error;
  }
};

export const getPlayers = async () => {
  try {
    const playersRef = collection(db, 'players');
    const q = query(playersRef, orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting players:', error);
    throw error;
  }
};
