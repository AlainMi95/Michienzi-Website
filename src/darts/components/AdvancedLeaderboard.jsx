import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './AdvancedLeaderboard.css';

// Utility to aggregate stats from games
function aggregateStats(games, players) {
  const stats = {};
  const headToHead = {};

  players.forEach(p => {
    stats[p.id] = {
      ...p,
      games: 0,
      wins: 0,
      totalScore: 0,
      totalDartsThrown: 0,
      avgScore: 0,
      checkoutPercentage: 0,
    };
    headToHead[p.id] = {};
    players.forEach(op => {
      if (op.id !== p.id) headToHead[p.id][op.id] = { wins: 0, games: 0 };
    });
  });

  games.forEach(game => {
    const { player1Id, player2Id, winnerId, player1Score, player2Score, player1DartsThrown, player2DartsThrown } = game;
    // Update player 1
    if (stats[player1Id]) {
      stats[player1Id].games += 1;
      stats[player1Id].totalScore += player1Score || 0;
      stats[player1Id].totalDartsThrown += player1DartsThrown || 0;
      stats[player1Id].wins += winnerId === player1Id ? 1 : 0;
    }
    // Update player 2
    if (stats[player2Id]) {
      stats[player2Id].games += 1;
      stats[player2Id].totalScore += player2Score || 0;
      stats[player2Id].totalDartsThrown += player2DartsThrown || 0;
      stats[player2Id].wins += winnerId === player2Id ? 1 : 0;
    }
    // Head-to-head
    if (headToHead[player1Id] && headToHead[player1Id][player2Id]) {
      headToHead[player1Id][player2Id].games += 1;
      headToHead[player2Id][player1Id].games += 1;
      if (winnerId === player1Id) {
        headToHead[player1Id][player2Id].wins += 1;
      } else if (winnerId === player2Id) {
        headToHead[player2Id][player1Id].wins += 1;
      }
    }
  });

  // Calculate averages
  Object.values(stats).forEach(s => {
    s.avgScore = s.totalDartsThrown ? s.totalScore / s.totalDartsThrown : 0;
    s.checkoutPercentage = s.games ? (s.wins / s.games) * 100 : 0;
  });

  return { stats, headToHead };
}

const AdvancedLeaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState({});
  const [headToHead, setHeadToHead] = useState({});
  const [selected1, setSelected1] = useState('');
  const [selected2, setSelected2] = useState('');

  useEffect(() => {
    async function fetchData() {
      const playersSnap = await getDocs(collection(db, 'players'));
      const playersData = playersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlayers(playersData);
      const gamesSnap = await getDocs(collection(db, 'games'));
      const gamesData = gamesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGames(gamesData);
      const { stats, headToHead } = aggregateStats(gamesData, playersData);
      setStats(stats);
      setHeadToHead(headToHead);
    }
    fetchData();
  }, []);

  // Head-to-head display
  let headToHeadResult = null;
  if (selected1 && selected2 && headToHead[selected1] && headToHead[selected1][selected2]) {
    const stats1 = headToHead[selected1][selected2];
    const stats2 = headToHead[selected2][selected1];
    headToHeadResult = (
      <div className="h2h-result">
        <span>{players.find(p => p.id === selected1)?.name} vs {players.find(p => p.id === selected2)?.name}:</span>
        <span>{stats1.wins} - {stats2.wins} (out of {stats1.games} games)</span>
      </div>
    );
  }

  return (
    <div className="advanced-leaderboard-container">
      <h2>Leaderboard (Aggregated from Played Games)</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Games</th>
            <th>Wins</th>
            <th>Avg Score</th>
            <th>Checkout %</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(stats).sort((a, b) => b.wins - a.wins).map((player, i) => (
            <tr key={player.id}>
              <td>{i + 1}</td>
              <td>{player.name}</td>
              <td>{player.games}</td>
              <td>{player.wins}</td>
              <td>{player.avgScore.toFixed(1)}</td>
              <td>{player.checkoutPercentage.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '2rem' }}>Head-to-Head Comparison</h3>
      <div className="h2h-dropdowns">
        <select value={selected1} onChange={e => setSelected1(e.target.value)}>
          <option value="">Select Player 1</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select value={selected2} onChange={e => setSelected2(e.target.value)}>
          <option value="">Select Player 2</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      {headToHeadResult}

      <h3 style={{ marginTop: '2rem' }}>All-vs-All Matrix</h3>
      <div className="matrix-scroll">
        <table className="matrix-table">
          <thead>
            <tr>
              <th></th>
              {players.map(p => <th key={p.id}>{p.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {players.map(row => (
              <tr key={row.id}>
                <td><b>{row.name}</b></td>
                {players.map(col => (
                  <td key={col.id} style={{ background: row.id === col.id ? '#222' : undefined }}>
                    {row.id === col.id ? '-' : (headToHead[row.id]?.[col.id]?.wins || 0)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvancedLeaderboard;
