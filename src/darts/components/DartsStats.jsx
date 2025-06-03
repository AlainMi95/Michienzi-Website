import React, { useState, useEffect } from 'react';
import './DartsStats.css';
import { getPlayers, getLeaderboard } from '../../services/firebaseService';

const DartsStats = () => {
  const [stats, setStats] = useState({
    players: [],
    leaderboard: []
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Load players from Firebase
      const players = await getPlayers();
      
      // Process players for display
      const processedStats = {
        players: players,
        leaderboard: [...players]
          .sort((a, b) => b.averageScore - a.averageScore)
      };

      setStats(processedStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="stats-container">
      <div className="stats-section">
        <h2>Leaderboard</h2>
        <div className="leaderboard">
          <div className="leaderboard-header">
            <div className="leaderboard-cell">Rank</div>
            <div className="leaderboard-cell">Player</div>
            <div className="leaderboard-cell">Games</div>
            <div className="leaderboard-cell">Wins</div>
            <div className="leaderboard-cell">Avg Score</div>
            <div className="leaderboard-cell">Checkout %</div>
          </div>
          {stats.leaderboard.map((player, index) => (
            <div key={player.name} className="leaderboard-item">
              <div className="leaderboard-cell">{index + 1}</div>
              <div className="leaderboard-cell">{player.name}</div>
              <div className="leaderboard-cell">{player.games}</div>
              <div className="leaderboard-cell">{player.wins}</div>
              <div className="leaderboard-cell">{player.averageScore.toFixed(1)}</div>
              <div className="leaderboard-cell">{player.checkoutPercentage?.toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DartsStats;
