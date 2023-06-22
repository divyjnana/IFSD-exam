import React, { useState } from 'react';

class Team {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

class Player {
  constructor() {
    this.players = [];
  }
  getInput(teamSize) {
    for (let i = 0; i < teamSize; i++) {
      const playerScore = parseInt(prompt(`Enter the score of Player ${i}: `));
      const team = new Team(`Player ${i}`, playerScore);
      this.players.push(team);
    }
  }
  calculateAvgScore() {
    let totalScore = 0;
    for (let i = 0; i < this.players.length; i++) {
      totalScore += this.players[i].score;
    }
    this.avg = totalScore / this.players.length;
  }
  calculateMaxScore() {
    let maxScore = 0;
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].score > maxScore) {
        maxScore = this.players[i].score;
      }
    }
    this.max = maxScore;
  }
  calculateMinScore() {
    let minScore = this.players[0].score;
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].score < minScore) {
        minScore = this.players[i].score;
      }
    }
    this.min = minScore;
  }
}

function TeamWidget() {
  const [teamSize, setTeamSize] = useState('');
  const [playerScores, setPlayerScores] = useState([]);
  const [averageScore, setAverageScore] = useState(null);
  const [minScore, setMinScore] = useState(null);
  const [maxScore, setMaxScore] = useState(null);

  const handleTeamSizeChange = (event) => {
    setTeamSize(event.target.value);
  };

  const handlePlayerScoreChange = (index, event) => {
    const newPlayerScores = [...playerScores];
    newPlayerScores[index] = parseInt(event.target.value);
    setPlayerScores(newPlayerScores);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const playerInstance = new Player();
    playerInstance.getInput(teamSize);
    playerInstance.calculateAvgScore();
    playerInstance.calculateMaxScore();
    playerInstance.calculateMinScore();

    setAverageScore(playerInstance.avg);
    setMinScore(playerInstance.min);
    setMaxScore(playerInstance.max);
  };

  return (
    <div>
      <h2>Team and Player Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Team Size:
          <input type="number" value={teamSize} onChange={handleTeamSizeChange} />
        </label>
        <br />
        {teamSize > 0 && (
          <>
            {Array.from({ length: teamSize }).map((_, index) => (
              <div key={index}>
                <label>
                  Score for Player {index}:
                  <input
                    type="number"
                    value={playerScores[index] || ''}
                    onChange={(event) => handlePlayerScoreChange(index, event)}
                  />
                </label>
              </div>
            ))}
            <br />
            <button type="submit">Calculate</button>
          </>
        )}
      </form>
      {averageScore !== null && (
        <div>
          <p>Average Score: {averageScore}</p>
          <p>Minimum Score: {minScore}</p>
          <p>Maximum Score: {maxScore}</p>
        </div>
      )}
    </div>
  );
}

export default TeamWidget;
