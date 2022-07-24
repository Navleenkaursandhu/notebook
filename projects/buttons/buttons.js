const initialCount = {
  "purple-btn": 0,
  "pink-btn": 0,
  "blue-btn": 0
}

let arrayBtnDivs = document.querySelectorAll(".btn");
console.log(arrayBtnDivs);

const click = (array) => {
  array.forEach(btn => {
    return btn.onclick = () => {
      initialCount[btn.id] = initialCount[btn.id] + 1;
      return btn.innerText = initialCount[btn.id];
    }
  });
}

click(arrayBtnDivs);

const clearText = () => {
  arrayBtnDivs.forEach((btn) => {
    return btn.innerText = "";
  })
}

document.querySelector("#reset-btn").onclick = () => clearText();