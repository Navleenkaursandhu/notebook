const rockButtonElement = document.querySelector("#rock"); 
const paperButtonElement = document.querySelector("#paper");
const scissorsButtonElement = document.querySelector("#scissors");
const resetButtonElement = document.querySelector("#reset");

rockButtonElement.onclick = () => {
  console.log("rock");
}

paperButtonElement.onclick = () => {
  console.log("paper");
}

scissorsButtonElement.onclick = () => {
  console.log("scissors");
}

resetButtonElement.onclick = () => {
  console.log("reset");
}