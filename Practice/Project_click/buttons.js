const initialCount = {
  "purple": 0,
  "pink": 0,
  "blue": 0
}

let arrayBtnDivs = document.querySelectorAll(".btn");
console.log(arrayBtnDivs);

const click = (array) => {
  array.forEach(btn => {
    return btn.onclick = () => {
      initialCount[btn.value] = initialCount[btn.value] + 1;
      return btn.innerText = initialCount[btn.value];
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
