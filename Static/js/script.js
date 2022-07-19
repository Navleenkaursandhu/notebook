//to display age in days
function getAgeInDays() {
  let birthYear = prompt("Hey there!....Please enter your year of Birth:)");
  let ageInDays = (2021 - birthYear) * 365;
  var h1 = document.createElement("h1"); // <h1></h1>
  h1.setAttribute("id", "getAge"); //<h1 id="age"></h1>
  let text = document.createTextNode("You are " + ageInDays + " days old!");
  h1.appendChild(text);
  document.querySelector("#flex-box-result").appendChild(h1);
}

//to reset the text 
function reset() {
  document.querySelector("#flex-box-result").remove();
}

//to generate images
function generate() {
  let div = document.querySelector("#generate-image");//<div></div>
  let img = document.createElement("img");
  img.src = "https://bestanimations.com/Animals/Mammals/Cats/cats/cute-kitty-animated-gif-26.gif";
  div.appendChild(img);
}

//
function game(yourChoice) {
  const humanChoice = yourChoice.id;
  console.log(humanChoice);
  const computerChoice = numberToChoose(randomToRpsInt());
  console.log(computerChoice);
  const results = decideWinner(humanChoice, computerChoice);//[0,1]
  console.log(results);
  const message = finalMessage(results);
  console.log(message);
  frontEndRps(humanChoice, computerChoice, message);
}

function randomToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoose(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsData = {
    "rock": { "rock": 0.5, "paper": 0, "scissors": 1 },
    "paper": { "rock": 1, "paper": 0.5, "scissors": 0 },
    "scissors": { "rock": 0, "paper": 1, "scissors": 0.5 },
  }
  const yourScore = rpsData[yourChoice][computerChoice];//0
  const computerScore = rpsData[computerChoice][yourChoice]; //1

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { 'message': 'You Lost :(', 'color': 'red' };
  }
  else if (yourScore === 0.5) {
    return { 'message': 'Draw!', 'color': 'yellow' };
  }
  else {
    return { 'message': 'You Won :)', 'color': 'green' };
  }
}

function frontEndRps(humanImgChoice, computerImgChoice, finalMessage) {
  const imagesData = {
    "rock": document.querySelector("#rock").src,
    "paper": document.querySelector("#paper").src,
    "scissors": document.querySelector("#scissors").src
  }

  //removing images
  document.querySelector("#rock").remove();
  document.querySelector("#paper").remove();
  document.querySelector("#scissors").remove();

  const humanDiv = document.createElement("div");
  const computerDiv = document.createElement("div");
  const messageDiv = document.createElement("div");

  humanDiv.innerHTML = "<img src='" + imagesData[humanImgChoice] + "'height= 150px width= 150px;'>"
  messageDiv.innerHTML = "<h1 style= 'color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
  computerDiv.innerHTML = "<img src='" + imagesData[computerImgChoice] + "'height= 150px width= 150px;'>"

  document.querySelector("#flex-box-rps-div").appendChild(humanDiv);
  document.querySelector("#flex-box-rps-div").appendChild(messageDiv);
  console.log(messageDiv.innerHTML);
  document.querySelector("#flex-box-rps-div").appendChild(computerDiv);
}

//change color of all buttons
var all_buttons = document.getElementsByTagName("button");

const copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonRed();
  }
  else if (buttonThingy.value === "green") {
    buttonGreen();
  }
  else if (buttonThingy.value === "reset") {
    buttonColorReset();
  }
  else if (buttonThingy.value === "random") {
    randomColors();
  }
}

function buttonRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1])
    all_buttons[i].classList.add(copyAllButtons[i])
  }
}

function randomColors() {
  const choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];
  
  for(let i = 0; i < all_buttons.length; i++){
  let randomNo = Math.floor(Math.random() * 4);
  all_buttons[i].classList.remove(all_buttons[i].classList[1]);
  all_buttons[i].classList.add(choices[randomNo]);
  }
}

//blackjack
const blackjackGame = {
  "you": {"scoreSpan": "#your-blackjack-result", "div": "#your-box", "score": 0},
  "dealer": {"scoreSpan":"#dealer-blackjack-result", "div":"#dealer-box","score": 0},
  "cards": ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  "cardsMap": {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1,11]},
  "wins": 0,
  "losses": 0,
  "draws": 0,
  "isStand": false,
  "turnOver": false
} 

const YOU = blackjackGame["you"];
const DEALER =  blackjackGame["dealer"];

const hitSound = new Audio("./sounds/swish.m4a");
const winSound = new Audio("./sounds/cash.mp3");
const lossSound = new Audio("./sounds/aww.mp3");

document.querySelector("#blackjack-hit-button").addEventListener("click", blackjackHit);

document.querySelector("#blackjack-stand-button").addEventListener("click", dealerLogic);

document.querySelector("#blackjack-deal-button").addEventListener("click", blackjackDeal)

function blackjackHit(){
  if(blackjackGame['isStand'] === false){
  let card = randomCard();
  showCard(YOU, card);
  updateScore(YOU, card);
  showScore(YOU);
  }
  console.log(blackjackGame['isStand']);
}

function showCard(activePlayer, card) {
  if(activePlayer['score'] <= 21){
  let cardImage = document.createElement("img");
  cardImage.src = `./images/${card}.png`;
  document.querySelector(activePlayer["div"]).appendChild(cardImage);
  hitSound.play();
  }
}

function blackjackDeal() {
  if(blackjackGame['turnOver'] === true){

  blackjackGame['isStand'] = false;
  let yourImages = document.querySelector("#your-box").querySelectorAll("img");
  let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
  
  for(let i = 0; i < yourImages.length; i++){
    yourImages[i].remove();
  }

  for(let i = 0; i < dealerImages.length; i++){
    dealerImages[i].remove();
  }

  YOU['score'] = 0;
  DEALER['score'] = 0;

  document.querySelector('#your-blackjack-result').textContent = 0;
  document.querySelector('#dealer-blackjack-result').textContent = 0;

  document.querySelector("#blackjack-result").textContent = "Let's Play";
  document.querySelector("#blackjack-result").style.color = "black";
  blackjackGame['turnOver'] = true;
 }
}

function randomCard(){
  let randomIndex = Math.floor((Math.random()) * 13);
  return blackjackGame["cards"][randomIndex];
}

function updateScore(activePlayer, card) {
  if(card === 'A'){
    //if adding 11 is below 21, add 11 , else add 1
  if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
    activePlayer['score'] += blackjackGame['cardsMap'][card][1];
  }
  else{
    activePlayer['score'] += blackjackGame['cardsMap'][card][0];
  }
}
else{
  activePlayer['score'] += blackjackGame['cardsMap'][card];
}
}

function showScore(activePlayer){
  if(activePlayer['score'] >21){
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
  
  }
  else{
  document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer['score'];
}
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function dealerLogic() {
  blackjackGame['isStand'] = true;

  while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
  let card = randomCard();
  showCard(DEALER, card);
  updateScore(DEALER, card);
  showScore(DEALER);
  await sleep(1000);
  }

    blackjackGame['turnOver'] = true;
    showResult(computeWinner());
  
}

//compute winner and return the winner
function computeWinner() {
  let winner

  if(YOU['score'] <= 21){
    if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
      blackjackGame['wins']++;
      winner = YOU;
    }
    else if(YOU['score'] < DEALER['score']){
      blackjackGame['losses']++;
      winner = DEALER;
    }
    else if(YOU['score'] === DEALER['score']){
      blackjackGame['draws']++;
    }
  }
  else if(YOU['score'] > 21 && DEALER['score'] <=21){
  blackjackGame['losses']++;
  winner = DEALER;
  }
  else if(YOU['score'] > 21 && DEALER['score']>21){
    blackjackGame['draws']++;
  }
  console.log(blackjackGame);
  return winner;
}

function showResult(winner){
  let message, messageColor;

  if(blackjackGame['turnOver'] === true){
  if(winner === YOU){
    document.querySelector("#wins").textContent = blackjackGame['wins'];
    message = "You won:)";
    messageColor = "green";
    winSound.play();
  }
  else if(winner === DEALER){
    document.querySelector("#losses").textContent = blackjackGame['losses'];
    message = "You Lost:(";
    messageColor = "red";
    lossSound.play();
  }
  else {
    document.querySelector("#draws").textContent = blackjackGame['draws'];
    message = "It's a Draw";
    messageColor = "black";
  }

  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
}
}
