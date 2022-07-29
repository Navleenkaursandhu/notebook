//create a UI displaying the turn number and whose turn  
//limited no of  turns
//players take their turn one at a time

//player class:
//keep track of its current health 
//store its name
//how to hit another player
//how to heal 

//Game class:
//stores playerA & playerB
//max no of turns
//current turn 
//current player whose taking the turn
//method: isGameOver()
//when either of the players health is 0 or the turn reaches its max 

//global function
//name it function updateUI(){}, with no arguments




const playerA_Health_Div = document.querySelector("#health-player-A");
const playerB_Health_Div = document.querySelector("#health-player-B");
const restart_Div = document.querySelector("#restart");
const playerA_Name_Div = document.querySelector("#player-A");
const playerB_Name_Div = document.querySelector("#player-B");
const currentRound_Div = document.querySelector("#current-round");
const totalRounds_Div = document.querySelector("#total-rounds");
const pointA = document.querySelector(".pointer-A");
const pointB  = document.querySelector(".pointer-B");
const finalResult =  document.querySelector("#result");

const updateUI = () => {
  playerA_Health_Div.innerText = playerA.health;
  playerB_Health_Div.innerText = playerB.health;
  playerA_Name_Div.innerText = playerA.name;
  playerB_Name_Div.innerText = playerB.name;
  currentRound_Div.innerText = game.round;

  if(game.isPlayerAPlaying){
    pointA.style.borderRight = "30px solid purple";
    pointB.style.borderLeft = "30px solid black";
  }
  else {
    pointA.style.borderRight = "30px solid black";
    pointB.style.borderLeft = "30px solid purple";
  }

  if(game.round === 0){
    pointA.style.borderRight = "30px solid black";
    pointB.style.borderLeft = "30px solid black";
    finalResult.innerText = game.winner();
    document.querySelector("#winner").play();
  }

}



class Game {
  constructor(playerA, playerB,maxRound) {
    this.roundsAreDone = false;
    this.playerA = playerA;
    this.playerB = playerB;
    this.isPlayerAPlaying = true;
    this.round = maxRound; 
    this.maxRound = maxRound;   
  }

  restart() {
    this.playerA.reset();
    this.playerB.reset();
    this.round = this.maxRound;
    this.isPlayerAPlaying = true;
    this.roundsAreDone = false;
  }

  nextTurn() {
    if(this.isPlayerAPlaying){
      this.isPlayerAPlaying = false;
    }
    else {
      this.isPlayerAPlaying = true;
      this.round --;
      if(this.round === 0){
        this.roundsAreDone = true;
      }
    }
  }

  isOver() {
    return this.playerA.health <= 0 || this.playerB.health <= 0 || this.roundsAreDone;
  }

  winner() {
    if(this.playerA.health > this.playerB.health){
      return "Abbie Wins!";
    }
    else if(this.playerA.health < this.playerB.health){
      return "Lisa Wins!";
    }
    else {
      return "It's a Tie";
    }
  }
}


class Player {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }

  hit(enemy) {
    let randomDamage = Math.ceil(Math.random() * 10)
    enemy.takeHit(randomDamage);
  }

  takeHit(damage) {
    this.health = this.health - damage;
  }

  lifeline() {
    if(this.health < 100){
      let randomHealth = Math.ceil(Math.random() * 5)
      this.health = this.health + randomHealth;

      if(this.health > 100){
        this.health = 100;
      }
    }
  }

  reset() {
    this.health = 100;
  }
}

const playerA = new Player("Player A", 100);
const playerB = new Player("Player B", 100);
const game = new Game(playerA, playerB, 3);


document.addEventListener("keydown", (event) => {
  if (!game.isOver() && game.isPlayerAPlaying && event.key === "a") {
    playerA.hit(playerB);
    game.nextTurn();
    updateUI();
    document.querySelector("#pAhit").play();
  }
})

document.addEventListener("keydown", (event) => {
  if (!game.isOver() && game.isPlayerAPlaying && event.key === "z") {
    playerA.lifeline();
    game.nextTurn();
    updateUI();
    document.querySelector("#pAlifeline").play();
  }
})

document.addEventListener("keydown", (event) => {
  if (!game.isOver() && !game.isPlayerAPlaying && event.key === "l") {
    playerB.hit(playerA);
    game.nextTurn();
    updateUI();
    document.querySelector("#pBhit").play();
  }
})

document.addEventListener("keydown", (event) => {
  if (!game.isOver() && !game.isPlayerAPlaying && event.key === "m") {
    playerB.lifeline();
    game.nextTurn();
    updateUI();
    document.querySelector("#pBlifeline").play();
  }
})

restart_Div.onclick = () => {
  game.restart();
  finalResult.innerText = "LET'S PLAY AGAIN!";
  updateUI();
}

updateUI()