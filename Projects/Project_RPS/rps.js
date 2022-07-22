const rockButtonElement = document.querySelector("#rock"); 
const paperButtonElement = document.querySelector("#paper");
const scissorsButtonElement = document.querySelector("#scissors");
const resetButtonElement = document.querySelector("#reset");
const playerSelection = document.querySelector("#player-selection");
const playerScore = document.querySelector("#updated-score");
const botSelection = document.querySelector("#bot-selection");
const displayResult = document.querySelector("#result");
const displayScore = document.querySelector("#updated-score");

const rock = rockButtonElement.innerText;
const paper = paperButtonElement.innerText;
const scissors = scissorsButtonElement.innerText;

rockButtonElement.onclick = () => {
  playerSelection.innerText = rock;
  computerSelection();
  result();
  score();
}

paperButtonElement.onclick = () => {
  playerSelection.innerText = paper;
  computerSelection();
  result();
  score();
}

scissorsButtonElement.onclick = () => {
  playerSelection.innerText = scissors;
  computerSelection();
  result();
  score();
}

resetButtonElement.onclick = () => {
  playerScore.innerText = 0;
  playerSelection.innerText = "";
  botSelection.innerText = "";
}

const computerSelection = () => {
  const array = [rock, paper, scissors ];
  let randomNum = Math.floor(Math.random() * 3);
  let randomEmoji = array[randomNum];
  botSelection.innerHTML = randomEmoji;
}

const result = () => {
  const playerChoice = playerSelection.innerText;
  const botChoice = botSelection.innerText;
  if(playerChoice === botChoice){
    displayResult.innerText = "It's a Draw!";

  }
  else if(
    (playerChoice === rock && botChoice === paper) || 
    (playerChoice === paper && botChoice === scissors) ||
    (playerChoice === scissors && botChoice === rock)
  ){
    displayResult.innerText = "You Lost:(";
  }
  else{
    displayResult.innerText = "You Won:)";
  }
}

const score = () => {
  if(displayResult.innerText === "You Won:)"){
    displayScore.innerText = Number(displayScore.innerText) + 1;
  }
  else if(displayResult.innerText === "You Lost:("){
    displayScore.innerText = Number(displayScore.innerText) - 1;
  }
}
