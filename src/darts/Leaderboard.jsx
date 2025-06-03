import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Leaderboard.css';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersRef = collection(db, 'players');
        const q = query(playersRef, orderBy('averageScore', 'desc'));
        const querySnapshot = await getDocs(q);
        const playersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlayers(playersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching players:', error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const calculateWinPercentage = (wins, games) => {
    if (!games || games === 0) return '0%';
    return ((wins / games) * 100).toFixed(1) + '%';
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
      </div>

      {loading ? (
        <div className="loading">Loading leaderboard...</div>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Games</th>
              <th>Wins</th>
              <th>Win %</th>
              <th>AVG Score</th>
              <th>Checkout %</th>
            </tr>
          </thead>
          <tbody>
            {players.length > 0 ? (
              players.map((player, index) => (
                <tr key={player.id}>
                  <td className="rank">{index + 1}</td>
                  <td className="player-name">{player.name || 'Unknown'}</td>
                  <td>{player.gamesPlayed || 0}</td>
                  <td>{player.wins || 0}</td>
                  <td>{calculateWinPercentage(player.wins || 0, player.gamesPlayed || 0)}</td>
                  <td>{(player.averageScore || 0).toFixed(1)}</td>
                  <td>{(player.checkoutPercentage || 0).toFixed(1)}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-players">No players found. Add some to get started!</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="leaderboard-footer">
        <p>Updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Leaderboard;
