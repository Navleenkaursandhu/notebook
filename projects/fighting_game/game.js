const playerA_Name_Div = document.querySelector("#player-A");
const playerB_Name_Div = document.querySelector("#player-B");
const playerA_Health_Div = document.querySelector("#health-player-A");
const playerB_Health_Div = document.querySelector("#health-player-B");
const result = document.querySelector("#result");
const resetDiv = document.querySelector("#reset");
const simulateDiv = document.querySelector("#simulate");

const updateGame = (pA, pB, gameState) => {
  playerA_Name_Div.innerText = pA.name;
  playerB_Name_Div.innerText = pB.name;
  playerA_Health_Div.innerText = pA.health;
  playerB_Health_Div.innerText = pB.health;

  if (pA.health <= 0 || pB.health <= 0) {
    game.isOver = true;
    gameState = game.isOver;
    result.innerText = game.declareWinner(game.isOver, playerA, playerB);
    return gameState;
  }
}

class Game {
  constructor() {
    this.isOver = false;
  }

  declareWinner(isOver, pA, pB) {
    let message = `It's a Tie!`;
    if (isOver == true && pA.health <= 0) {
      message = `${pB.name} WINS!`;
    }
    else if (isOver == true && pB.health <= 0) {
      message = `${pA.name} WINS!`
    }

    document.querySelector("#victory").play();

    return message;
  }

  reset(pA, pB) {
    pA.health = 100;
    pB.health = 100;
    this.isOver = false;
    result.innerText = '';
    updateGame(playerA, playerB, this.isOver)
  }

  play(pA, pB) {
    this.reset(playerA, playerB);

    while (!this.isOver) {
      pA.strike(pA, pB, pA.attackDamage);
      pB.heal(pB);
      pB.strike(pB, pA, pB.attackDamage);
      pA.heal(pA);
    }

    return this.declareWinner(this.isOver, playerA, playerB)

  }
}

const game = new Game();

resetDiv.onclick = () => {
  game.reset(playerA, playerB);
};

simulateDiv.onclick = () => {
  result.innerText = game.play(playerA, playerB)
}

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDamage = attackDamage;
  }

  strike(player, enemy, attackDmg) {
    let damageAmount = Math.ceil(Math.random() * attackDmg);
    enemy.health = enemy.health - damageAmount;

    updateGame(playerA, playerB, game.isOver)

    return `${player.name} attacks ${enemy.name} for ${damageAmount} damage!`;
  }

  heal(player) {
    let hpAmt = Math.ceil(Math.random() * 5)
    player.health = player.health + hpAmt;

    updateGame(playerA, playerB, game.isOver);

    return `${player.name} heals for ${hpAmt} HP!`;
  }
}

const playerA = new Player("Abby", 100, 10);
const playerB = new Player("Lisa", 100, 10);

document.addEventListener("keydown", function (e) {
  if (e.key == "q" && playerB.health > 0 && game.isOver == false) {
    playerA.strike(playerA, playerB, playerA.attackDamage);
    document.querySelector("#pAattack").play();
  }
})

document.addEventListener("keydown", function (e) {
  if (e.key == "a" && playerA.health > 0 && game.isOver == false) {
    playerA.heal(playerA);
    document.querySelector("#pAheal").play();
  }
})

document.addEventListener("keydown", function (e) {
  if (e.key == "p" && playerA.health > 0 && game.isOver == false) {
    playerB.strike(playerB, playerA, playerB.attackDamage);
    document.querySelector("#pBattack").play();
  }
})

document.addEventListener("keydown", function (e) {
  if (e.key == "l" && playerB.health > 0 && game.isOver == false) {
    playerB.heal(playerB);
    document.querySelector("#pBheal").play();
  }
})
