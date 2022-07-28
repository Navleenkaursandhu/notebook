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

const updateUI = () => {
  playerA_Health_Div.innerText = playerA.health;
  playerB_Health_Div.innerText = playerB.health;
  playerA_Name_Div.innerText = playerA.name;
  playerB_Name_Div.innerText = playerB.name;
}


class Game {
  constructor(playerA, playerB) {
    this.isOver = false;
    this.playerA = playerA;
    this.playerB = playerB;
  }

  restart() {
    this.playerA.reset();
    this.playerB.reset();
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
    updateUI();
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
    updateUI();
  }

  reset() {
    this.health = 100;
  }
}



const playerA = new Player("Abbie", 100);
const playerB = new Player("Lisa", 100);
const game = new Game(playerA, playerB);




document.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    playerA.hit(playerB);
    document.querySelector("#pAhit").play();
  }
})

document.addEventListener("keydown", (event) => {
  if (event.key === "z") {
    playerA.lifeline();
    document.querySelector("#pAlifeline").play();
  }
})

document.addEventListener("keydown", (event) => {
  if (event.key === "l") {
    playerB.hit(playerA);
    document.querySelector("#pBhit").play();
  }
})

document.addEventListener("keydown", (event) => {
  if (event.key === "m") {
    playerB.lifeline();
    document.querySelector("#pBlifeline").play();
  }
})


restart_Div.onclick = () => {
  game.restart();
  updateUI();
}


updateUI()