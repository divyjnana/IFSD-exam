const prompt = require('prompt-sync')();
class Team {
  constructor(name,score) {
    this.name=name;
    this.score = score;
  }
}
class player {
  constructor() {
  this.players = [];
  }
  getinput(){
    const teamSize = prompt("Enter the number of players: ");
    for(let i=0;i<teamSize;i++){
      const playerScore = parseInt(prompt(`Enter the score of Player ${i}: `));
      const team= new Team(`Player ${i}`,playerScore)
      this.players.push(team)
    }
  }
  claculateavgscore(){
    let totalScore=0;
    for(let i=0;i<this.players.length;i++){
      totalScore+=this.players[i].score;
    }
    this.avg=totalScore/this.players.length;
  }
  calculatemaxscore(){
    let maxScore=0;
    for(let i=0;i<this.players.length;i++){
      if(this.players[i].score>maxScore){
        maxScore=this.players[i].score;
      }
    }
    this.max=maxScore;
  }
  calculateminScore(){
    let minScore=this.players[0].score;
    for(let i=0;i<this.players.length;i++){
      if(this.players[i].score<minScore){
        minScore=this.players[i].score;
      }
    }
    this.min=minScore;
  }
}
function main(){
  const Player=new player();
  Player.getinput();
  Player.claculateavgscore();
  Player.calculatemaxscore();
  Player.calculateminScore();
  console.log(`The average score is ${Player.avg}, minimum score is ${Player.min} and maximum score is ${Player.max}.`);
}
main();
