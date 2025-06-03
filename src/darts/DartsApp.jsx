import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './DartsApp.css';
import GameInit from './components/GameInit';
import './DartsApp.css';
import { useNavigate } from 'react-router-dom';

const MAX_THROWS_PER_ROUND = 3;

const CHECKOUT_MAP = {
    170: [['T20', 'T20', 'Bull']],
    167: [['T20', 'T19', 'Bull']],
    164: [['T20', 'T18', 'Bull'], ['T19', 'T19', 'Bull']],
    161: [['T20', 'T17', 'Bull']],
    160: [['T20', 'T20', 'D20']],
    158: [['T20', 'T20', 'D19']],
    157: [['T20', 'T19', 'D20']],
    156: [['T20', 'T20', 'D18']],
    155: [['T20', 'T19', 'D19']],
    154: [['T20', 'T18', 'D20']],
    153: [['T20', 'T19', 'D18']],
    152: [['T20', 'T20', 'D16']],
    151: [['T20', 'T17', 'D20'], ['T19', 'T18', 'D20']],
    150: [['T20', 'T18', 'D18'], ['T19', 'T19', 'D18']],
    149: [['T20', 'T19', 'D16']],
    148: [['T20', 'T20', 'D14'], ['T19', 'T17', 'D20']],
    147: [['T20', 'T17', 'D18'], ['T19', 'T18', 'D18']],
    146: [['T20', 'T18', 'D16'], ['T19', 'T19', 'D16']],
    145: [['T20', 'T19', 'D14']],
    144: [['T20', 'T20', 'D12']],
    143: [['T20', 'T17', 'D16'], ['T19', 'T18', 'D16']],
    142: [['T20', 'T14', 'D20'], ['T19', 'T19', 'D14']],
    141: [['T20', 'T19', 'D12']],
    140: [['T20', 'T20', 'D10']],
    139: [['T20', 'T13', 'D20'], ['T20', 'T19', 'D11']],
    138: [['T20', 'T18', 'D12'], ['T19', 'T19', 'D12']],
    137: [['T20', 'T19', 'D10']],
    136: [['T20', 'T20', 'D8']],
    135: [['T20', 'T17', 'D12'], ['SBull', 'T20', 'Bull']],
    134: [['T20', 'T16', 'D13']],
    133: [['T20', 'T19', 'D8']],
    132: [['T20', 'T16', 'D12'], ['SBull', 'T19', 'Bull']],
    131: [['T19', 'T14', 'D16'], ['T20', 'T13', 'D16']],
    130: [['T20', 'T20', 'D5']],
    129: [['T19', 'T16', 'D12'], ['T20', 'T19', 'D6']],
    128: [['T18', 'T14', 'D16'], ['T20', 'T18', 'D7']],
    127: [['T20', 'T17', 'D8']],
    126: [['T19', 'T19', 'D6']],
    125: [['T18', 'T19', 'D7'], ['T20', 'T15', 'D10']],
    124: [['T20', 'T14', 'D11']],
    123: [['T19', 'T16', 'D9']],
    122: [['T18', 'T18', 'D7']],
    121: [['T20', 'T11', 'D14'], ['T17', 'T20', 'D5']],
    120: [['T20', '20', 'D20']],
    119: [['T19', 'T12', 'D13']],
    118: [['T20', '18', 'D20']],
    117: [['T19', '20', 'D20'], ['T20', '17', 'D20']],
    116: [['T19', '19', 'D20'], ['T20', '16', 'D20']],
    115: [['T20', '15', 'D20'], ['T19', '18', 'D20']],
    114: [['T19', '17', 'D20'], ['T20', '14', 'D20']],
    113: [['T19', '16', 'D20']],
    112: [['T20', 'T12', 'D8']],
    111: [['T19', '14', 'D20'], ['T20', '11', 'D20']],
    110: [['T20', 'T10', 'D10'], ['T20', 'Bull']],
    109: [['T20', '9', 'D20']],
    108: [['T20', '16', 'D16'], ['T20', '8', 'D20']],
    107: [['T19', 'T10', 'D10'], ['T19', 'Bull']],
    106: [['T20', 'T10', 'D8']],
    105: [['T20', '13', 'D16']],
    104: [['T19', '15', 'D16'], ['T18', 'Bull']],
    103: [['T19', '6', 'D20'], ['T19', '10', 'D18']],
    102: [['T20', '10', 'D16'], ['T20', '6', 'D18']],
    101: [['T20', '9', 'D16'], ['T17', 'Bull']],
    100: [['T20', 'D20']],
    99: [['T19', '10', 'D16'], ['T19', '6', 'D18']],
    98: [['T20', 'D19']],
    97: [['T19', 'D20']],
    96: [['T20', 'D18']],
    95: [['T19', 'D19'], ['SBull', 'T20', 'D5']],
    94: [['T18', 'D20'], ['SBull', 'T19', 'D6']],
    93: [['T19', 'D18'], ['SBull', 'T18', 'D7']],
    92: [['T20', 'D16'], ['SBull', 'T17', 'D8']],
    91: [['T17', 'D20'], ['SBull', 'T16', 'D9']],
    90: [['T20', 'D15'], ['T18', 'D18']],
    89: [['T19', 'D16']],
    88: [['T20', 'D14']],
    87: [['T17', 'D18']],
    86: [['T18', 'D16']],
    85: [['T15', 'D20'], ['T19', 'D14']],
    84: [['T20', 'D12']],
    83: [['T17', 'D16']],
    82: [['Bull', 'D16'], ['T14', 'D20']],
    81: [['T19', 'D12'], ['T15', 'D18']],
    80: [['T20', 'D10'], ['D20', 'D20']],
    79: [['T19', 'D11'], ['T13', 'D20']],
    78: [['T18', 'D12']],
    77: [['T19', 'D10']],
    76: [['T20', 'D8'], ['T16', 'D14']],
    75: [['T17', 'D12']],
    74: [['T14', 'D16']],
    73: [['T19', 'D8']],
    72: [['T16', 'D12'], ['T20', 'D6']],
    71: [['T13', 'D16']],
    70: [['T18', 'D8'], ['T20', 'D5']],
    69: [['T19', 'D6']],
    68: [['T20', 'D4'], ['T16', 'D10'], ['T18', 'D7']],
    67: [['T9', 'D20'], ['T17', 'D8']],
    66: [['T10', 'D18'], ['T18', 'D6'], ['T16', 'D9']],
    65: [['T11', 'D16'], ['T19', 'D4'], ['T15', 'D10']],
    64: [['T16', 'D8'], ['T14', 'D11']],
    63: [['T13', 'D12'], ['T17', 'D6']],
    62: [['T10', 'D16'], ['T12', 'D13']],
    61: [['T15', 'D8'], ['T7', 'D20'], ['T11', 'D14']],
    60: [['20', 'D20']],
    59: [['19', 'D20']],
    58: [['18', 'D20']],
    57: [['17', 'D20']],
    56: [['16', 'D20']],
    55: [['15', 'D20']],
    54: [['14', 'D20']],
    53: [['13', 'D20']],
    52: [['12', 'D20'], ['20', 'D16']],
    51: [['11', 'D20'], ['19', 'D16']],
    50: [['10', 'D20'], ['18', 'D16']],
    49: [['9', 'D20'], ['17', 'D16']],
    48: [['16', 'D16'], ['8', 'D20']],
    47: [['7', 'D20'], ['15', 'D16']]
};

const DartsApp = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    players: [],
    startingScore: 501,
    mode: '501',
    scores: [501, 501],
    currentPlayer: 0,
    gameStarted: false,
    currentRound: [],
    throws: [[], []],
    legsWon: [0, 0],
    bust: false,
    multiplier: 1,
    legsToPlay: 3 // default, will be replaced by GameInit
  });

  const startGame = ({ players, startingScore, mode, legsToPlay }) => {
    setGameState({
      players,
      startingScore,
      mode,
      scores: [startingScore, startingScore],
      currentPlayer: 0,
      gameStarted: true,
      currentRound: [],
      throws: [[], []],
      legsWon: [0, 0],
      bust: false,
      multiplier: 1,
      legsToPlay: legsToPlay || 3
    });
  };

  const handleNumberClick = (value) => {
    if (gameState.bust) return;

    const isBull = value === 25 || value === 50;
    if (isBull && gameState.multiplier > 1) return;

    const score = value * gameState.multiplier;

    const scores = [...gameState.scores];
    const throws = [...gameState.throws];
    const round = [...gameState.currentRound];

    if (scores[gameState.currentPlayer] - score < 0) {
      return setGameState({ ...gameState, bust: true, currentRound: [] });
    }

    const isCheckout = scores[gameState.currentPlayer] - score === 0;
    if (isCheckout && !(gameState.multiplier === 2 || value === 50)) {
      return setGameState({ ...gameState, bust: true, currentRound: [] });
    }

    scores[gameState.currentPlayer] -= score;
    round.push(score);
    throws[gameState.currentPlayer].push(score);

    if (scores[gameState.currentPlayer] === 0) return handleLegWin(scores, throws);

    if (round.length >= MAX_THROWS_PER_ROUND) return switchPlayer(scores, throws);

    setGameState({ ...gameState, scores, currentRound: round, throws, multiplier: 1 });
  };

  const handleUndo = () => {
    const throws = [...gameState.throws];
    const round = [...gameState.currentRound];
    const scores = [...gameState.scores];

    const lastThrow = round.pop();
    if (lastThrow === undefined) return;

    throws[gameState.currentPlayer].pop();
    scores[gameState.currentPlayer] += lastThrow;

    setGameState({ ...gameState, throws, scores, currentRound: round, bust: false });
  };

  const switchPlayer = (scores, throws) => {
    const next = (gameState.currentPlayer + 1) % 2;
    setGameState(prev => ({
      ...prev,
      currentPlayer: next,
      currentRound: [], // ensure new player's round is empty
      scores,
      throws,
      bust: false,
      multiplier: 1
    }));
  };

  const handleLegWin = (scores, throws) => {
    const winner = gameState.players[gameState.currentPlayer];
    const legs = [...gameState.legsWon];
    legs[gameState.currentPlayer]++;
    // Calculate how many legs needed to win (majority)
    const legsToWin = Math.ceil((gameState.legsToPlay || 3) / 2);
    if (legs[gameState.currentPlayer] === legsToWin) {
      // Save game result to Firestore
      (async () => {
        try {
          const player1 = gameState.players[0];
          const player2 = gameState.players[1];
          const winnerPlayer = winner;
          const loserPlayer = gameState.players[(gameState.currentPlayer + 1) % 2];
          await addDoc(collection(db, 'games'), {
            player1Id: player1.id,
            player1Name: player1.name,
            player2Id: player2.id,
            player2Name: player2.name,
            winnerId: winnerPlayer.id,
            winnerName: winnerPlayer.name,
            loserId: loserPlayer.id,
            loserName: loserPlayer.name,
            player1Score: gameState.throws[0]?.reduce((a, b) => a + b, 0) || 0,
            player2Score: gameState.throws[1]?.reduce((a, b) => a + b, 0) || 0,
            player1DartsThrown: gameState.throws[0]?.length || 0,
            player2DartsThrown: gameState.throws[1]?.length || 0,
            datePlayed: new Date().toISOString(),
            legsWon: [...legs],
            mode: gameState.mode,
            startingScore: gameState.startingScore,
            legsToPlay: gameState.legsToPlay || 3
          });
        } catch (err) {
          console.error('Failed to save game:', err);
        }
      })();
      // Reset to overview
      return setGameState({
        players: [],
        startingScore: 501,
        mode: '501',
        scores: [501, 501],
        currentPlayer: 0,
        gameStarted: false,
        currentRound: [],
        throws: [[], []],
        legsWon: [0, 0],
        bust: false,
        multiplier: 1,
        legsToPlay: gameState.legsToPlay || 3
      });
    }

    setGameState({
      ...gameState,
      scores: [gameState.startingScore, gameState.startingScore],
      legsWon: legs,
      throws: [[], []],
      currentRound: [],
      currentPlayer: (gameState.currentPlayer + 1) % 2,
      bust: false,
      multiplier: 1
    });
  };

  if (!gameState.gameStarted) return (
    <div className="darts-overview-menu responsive-overview">
      <GameInit onStartGame={startGame} />
      <div style={{ height: 24 }} />
      <button
        className="control-btn styled leaderboard-btn"
        onClick={() => navigate('/leaderboard')}
      >
        View Leaderboard
      </button>
    </div>
  );

  // Always show the checkout suggestion for the current score if available
  const throwsThisRound = gameState.currentRound.length;
  const currentScore = gameState.scores[gameState.currentPlayer];
  const suggestion = CHECKOUT_MAP[currentScore];

  let checkoutHint = null;
  if (suggestion) {
    const dartsLeft = 3 - throwsThisRound;
    // Show all variations if enough darts left for any of them
    const validSuggestions = suggestion.filter(variation => dartsLeft >= variation.length);
    if (validSuggestions.length > 0) {
      checkoutHint = (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {validSuggestions.map((variation, idx) => (
            <li key={idx}>{variation.join(' → ')}</li>
          ))}
        </ul>
      );
    } else {
      checkoutHint = null;
    }
  }

  return (
    <div className="darts-container dark-theme">
      <div className="scoreboard">
        {gameState.players.map((p, i) => (
          <div key={i} className={`player-card ${i === gameState.currentPlayer ? 'active' : ''}`}>
            <h3>{p.name}</h3>
            <p className="stats-line">
              Score: {gameState.scores[i]} | Legs: {gameState.legsWon[i]} | Avg: {
                gameState.throws[i].length
                  ? Math.round(gameState.throws[i].reduce((a, b) => a + b, 0) / gameState.throws[i].length)
                  : 0
              }
            </p>
            <div className="throw-history" style={{ minHeight: '2.2em' }}>
              {i === gameState.currentPlayer && gameState.currentRound.map((s, idx) => (
                <span key={idx} className="throw-score">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="throw-display">
        <div className={`throw-box ${gameState.bust ? 'bust' : ''}`}>{gameState.currentRound.at(-1) || '0'}</div>
        {checkoutHint && (
          <div className="checkout-hint">
            {checkoutHint}
          </div>
        )}
      </div>

      <div className="dartboard-buttons">
        <div className="dart-multipliers">
          <button onClick={() => setGameState({ ...gameState, multiplier: 2 })}>Double</button>
          <button onClick={() => setGameState({ ...gameState, multiplier: 3 })}>Triple</button>
        </div>

        <div className="dart-numbers">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <button key={num} onClick={() => handleNumberClick(num)}>{num}</button>
          ))}
        </div>

        <div className="bull-buttons">
          <button onClick={() => handleNumberClick(25)}>Bull</button>
          <button onClick={() => handleNumberClick(50)}>Bullseye</button>
        </div>
      </div>

      <div className="numpad">
        <button onClick={handleUndo} className="control-btn styled" style={{ backgroundColor: '#ff1744' }}>Undo</button>
      </div>
    </div>
  );
};

export default DartsApp;
