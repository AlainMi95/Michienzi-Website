import React, { useState, useEffect } from "react";
import "./DartsApp.css";

const playersFromFile = ["Alain", "Player 2", "Player 3"];

const DartsApp = () => {
  const [startingScore, setStartingScore] = useState(501);
  const [legs, setLegs] = useState(1);
  const [players, setPlayers] = useState(playersFromFile);
  const [selectedPlayers, setSelectedPlayers] = useState(["", ""]);
  const [scores, setScores] = useState([501, 501]);
  const [input, setInput] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [legsWon, setLegsWon] = useState([0, 0]);
  const [gameStarted, setGameStarted] = useState(false);

  const checkoutMap = {
    170: ["T20", "T20", "Bull"],
    167: ["T20", "T19", "Bull"],
    164: ["T20", "T18", "Bull"],
    161: ["T20", "T17", "Bull"],
    160: ["T20", "T20", "D20"],
    158: ["T20", "T20", "D19"],
    157: ["T20", "T19", "D20"],
    156: ["T20", "T20", "D18"],
    155: ["T20", "T19", "D19"],
    154: ["T20", "T18", "D20"],
    153: ["T20", "T19", "D18"],
    152: ["T20", "T20", "D16"],
    151: ["T20", "T17", "D20"],
    150: ["T20", "T18", "D18"],
    149: ["T20", "T19", "D16"],
    148: ["T20", "T16", "D20"],
    147: ["T20", "T17", "D18"],
    146: ["T20", "T18", "D16"],
    145: ["T20", "T15", "D20"],
    144: ["T20", "T20", "D12"],
    143: ["T20", "T17", "D16"],
    142: ["T20", "T14", "D20"],
    141: ["T20", "T19", "D12"],
    140: ["T20", "T16", "D16"],
    139: ["T19", "T14", "D20"],
    138: ["T20", "T18", "D12"],
    137: ["T19", "T16", "D16"],
    136: ["T20", "T20", "D8"],
    135: ["T20", "T17", "D12"],
    134: ["T20", "T14", "D16"],
    133: ["T20", "T19", "D8"],
    132: ["T20", "T16", "D12"],
    131: ["T20", "T13", "D16"],
    130: ["T20", "T20", "D5"],
    129: ["T19", "T16", "D12"],
    128: ["T18", "T14", "D16"],
    127: ["T20", "T17", "D8"],
    126: ["T19", "T19", "D6"],
    125: ["25", "T20", "D20"],
    124: ["T20", "T16", "D8"],
    123: ["T19", "T16", "D9"],
    122: ["T18", "T20", "D4"],
    121: ["T17", "T10", "D20"],
    120: ["T20", "20", "D20"],
    119: ["T19", "T10", "D16"],
    118: ["T20", "18", "D20"],
    117: ["T20", "17", "D20"],
    116: ["T20", "16", "D20"],
    115: ["T20", "15", "D20"],
    114: ["T20", "14", "D20"],
    113: ["T20", "13", "D20"],
    112: ["T20", "12", "D20"],
    111: ["T20", "19", "D16"],
    110: ["T20", "18", "D16"],
    109: ["T19", "20", "D16"],
    108: ["T20", "16", "D16"],
    107: ["T19", "18", "D16"],
    106: ["T20", "14", "D16"],
    105: ["T19", "16", "D16"],
    104: ["T18", "18", "D16"],
    103: ["T20", "3", "D20"],
    102: ["T20", "10", "D16"],
    101: ["T20", "1", "D20"],
    100: ["T20", "D20"],
    99: ["T19", "10", "D16"],
    98: ["T20", "D19"],
    97: ["T19", "D20"],
    96: ["T20", "D18"],
    95: ["T19", "D19"],
    94: ["T18", "D20"],
    93: ["T19", "D18"],
    92: ["T20", "D16"],
    91: ["T17", "D20"],
    90: ["T20", "D15"],
    89: ["T19", "D16"],
    88: ["T16", "D20"],
    87: ["T17", "D18"],
    86: ["T18", "D16"],
    85: ["T15", "D20"],
    84: ["T20", "D12"],
    83: ["T17", "D16"],
    82: ["T14", "D20"],
    81: ["T19", "D12"],
    80: ["T20", "D10"],
    79: ["T19", "D11"],
    78: ["T18", "D12"],
    77: ["T19", "D10"],
    76: ["T20", "D8"],
    75: ["T17", "D12"],
    74: ["T14", "D16"],
    73: ["T19", "D8"],
    72: ["T16", "D12"],
    71: ["T13", "D16"],
    70: ["T10", "D20"],
    69: ["T15", "D12"],
    68: ["T20", "D4"],
    67: ["T17", "D8"],
    66: ["T10", "D18"],
    65: ["T19", "D4"],
    64: ["T16", "D8"],
    63: ["T13", "D12"],
    62: ["T10", "D16"],
    61: ["T15", "D8"],
    60: ["20", "D20"]
};

  useEffect(() => {
    if (gameStarted) {
      setScores([startingScore, startingScore]);
    }
  }, [startingScore, gameStarted]);

  const handleScoreInput = (digit) => {
    if (input.length < 3) setInput((prev) => prev + digit);
  };

  const resetInput = () => setInput("");

  const submitScore = () => {
    const score = parseInt(input, 10);
    if (isNaN(score) || score < 0 || score > 180) return alert("Invalid score");

    const updatedScores = [...scores];
    const remaining = updatedScores[currentPlayer] - score;

    if (remaining === 0) {
      alert(`${selectedPlayers[currentPlayer]} wins the leg!`);
      const updatedLegs = [...legsWon];
      updatedLegs[currentPlayer]++;
      setLegsWon(updatedLegs);

      if (updatedLegs[currentPlayer] >= legs) {
        alert(`${selectedPlayers[currentPlayer]} wins the game!`);
        setGameStarted(false);
        setSelectedPlayers(["", ""]);
        return;
      }

      setScores([startingScore, startingScore]);
    } else if (remaining < 0) {
      alert("Bust! Turn skipped.");
    } else {
      updatedScores[currentPlayer] = remaining;
      setScores(updatedScores);
    }

    setCurrentPlayer((prev) => 1 - prev);
    resetInput();
  };

  const handlePlayerSelect = (index, value) => {
    const updated = [...selectedPlayers];
    updated[index] = value;
    setSelectedPlayers(updated);
  };

  const startGame = () => {
    if (!selectedPlayers[0] || !selectedPlayers[1]) {
      alert("Please select both players");
      return;
    }
    setLegsWon([0, 0]);
    setInput("");
    setScores([startingScore, startingScore]);
    setCurrentPlayer(0);
    setGameStarted(true);
  };

  return (
    <div className="darts-container">
      <h1>🎯 Darts Tracker</h1>

      {!gameStarted && (
        <div className="settings">
          <label>Game Type:</label>
          <select onChange={(e) => setStartingScore(parseInt(e.target.value))}>
            <option value={501}>501</option>
            <option value={301}>301</option>
          </select>

          <label>Number of Legs:</label>
          <input
            type="number"
            min="1"
            value={legs}
            onChange={(e) => setLegs(parseInt(e.target.value))}
          />

          <div className="player-selects">
            {[0, 1].map((i) => (
              <select
                key={i}
                value={selectedPlayers[i]}
                onChange={(e) => handlePlayerSelect(i, e.target.value)}
              >
                <option value="">Select Player {i + 1}</option>
                {players.map((p, idx) => (
                  <option key={idx} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            ))}
          </div>

          <button onClick={startGame}>Start Game</button>
        </div>
      )}

      {gameStarted && (
        <>
          <div className="scoreboard">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`player-card ${currentPlayer === i ? "active" : ""}`}
              >
                <h2>{selectedPlayers[i] || `Player ${i + 1}`}</h2>
                <p>Score: {scores[i]}</p>
                <p>Legs Won: {legsWon[i]}</p>
              </div>
            ))}
          </div>

          <div className="numpad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <button key={num} onClick={() => handleScoreInput(num.toString())}>
                {num}
              </button>
            ))}
            <button onClick={resetInput}>Clear</button>
            <button onClick={submitScore}>Submit</button>
          </div>

          <div className="input-display">Current Input: {input}</div>
        </>
      )}

    {gameStarted && scores[currentPlayer] <= 170 && checkoutMap[scores[currentPlayer]] && (
        <div className="checkout-suggestion">
            {checkoutMap[scores[currentPlayer]].join("  ")}
        </div>
    )}

    </div>
  );
};

export default DartsApp;