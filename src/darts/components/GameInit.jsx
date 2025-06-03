import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './GameInit.css';

const GameInit = ({ onStartGame }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMode, setSelectedMode] = useState('501');
  const [selectedPlayers, setSelectedPlayers] = useState(['', '']);
  const [legsToPlay, setLegsToPlay] = useState(3);
  
  // Fetch players from Firestore
  useEffect(() => {
    let isMounted = true;
    
    const fetchPlayers = async () => {
      try {
        console.log('Fetching players from Firestore...');
        const playersRef = collection(db, 'players');
        const querySnapshot = await getDocs(playersRef);
        
        if (isMounted) {
          const playersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log('Fetched players:', playersData);
          setPlayers(playersData);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
        alert('Failed to load players. Please check your internet connection and try again.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlayers();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePlayerSelect = (index, playerId) => {
    const updated = [...selectedPlayers];
    updated[index] = playerId;
    setSelectedPlayers(updated);
  };

  const handleStartGame = () => {
    if (selectedPlayers[0] && selectedPlayers[1] && selectedPlayers[0] !== selectedPlayers[1]) {
      const player1 = players.find(p => p.id === selectedPlayers[0]);
      const player2 = players.find(p => p.id === selectedPlayers[1]);
      
      onStartGame({
        players: [player1, player2],
        startingScore: parseInt(selectedMode, 10),
        mode: selectedMode,
        legsToPlay: parseInt(legsToPlay, 10)
      });
    } else {
      alert('Please select two different players to start the game');
    }
  };


  if (loading) {
    return <div className="loading">Loading players...</div>;
  }

  return (
    <div className="game-init">
      <h2>Start a New Game</h2>
      
      <div className="game-mode">
        <h3>Game Mode</h3>
        <div className="mode-selector">
          <button 
            onClick={() => setSelectedMode('301')} 
            className={`mode-btn ${selectedMode === '301' ? 'active' : ''}`}
          >
            301
          </button>
          <button 
            onClick={() => setSelectedMode('501')} 
            className={`mode-btn ${selectedMode === '501' ? 'active' : ''}`}
          >
            501
          </button>
        </div>
      </div>

      <div className="legs-selector" style={{ marginBottom: '1.5rem' }}>
        <h3>Number of Legs</h3>
        <select
          value={legsToPlay}
          onChange={e => setLegsToPlay(e.target.value)}
          className="player-dropdown"
          style={{ minWidth: 100, fontSize: '1rem', padding: '0.5rem', borderRadius: '6px' }}
        >
          {[1,3,5,7,9,11].map(n => (
            <option key={n} value={n}>{n} (Best of {n})</option>
          ))}
        </select>
      </div>

      <div className="player-selection">
        <h3>Select Players</h3>
        
        <div className="player-selectors">
          {[0, 1].map((index) => (
            <div key={index} className="player-selector">
              <label>Player {index + 1}:</label>
              <select
                value={selectedPlayers[index] || ''}
                onChange={(e) => handlePlayerSelect(index, e.target.value)}
                className="player-dropdown"
              >
                <option value="">Select a player</option>
                {players.map((player) => (
                  <option 
                    key={player.id} 
                    value={player.id}
                    disabled={selectedPlayers.includes(player.id) && selectedPlayers[index] !== player.id}
                  >
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>


      <button 
        onClick={handleStartGame} 
        disabled={!selectedPlayers[0] || !selectedPlayers[1]}
        className="start-game-btn"
      >
        Start Game
      </button>
    </div>
  );
};

export default GameInit;
