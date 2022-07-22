const displayImage = document.querySelector("#image");
const buttonDiv = document.querySelector("#button");

buttonDiv.onclick = () => {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then(respose => respose.json()).then(result => {
      displayImage.innerHTML = `<img src = "${result.message}" height=300px, width=300px />`
    });
}