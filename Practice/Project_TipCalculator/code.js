const costInput = document.querySelector("#input-cost");
const tipInput = document.querySelector("#input-tip-percent");

const noCx = document.querySelector("#customers-count");
const amtCustomers = document.querySelector("#customer-amt");

let noOfCx = Number(noCx.innerText);
console.log(noOfCx);

const calculateBill = () => {
  const billAmt = Number(costInput.value);
  const totalAmt = (Number(tipInput.value) * billAmt) / 100 + billAmt;
  const costPerCx = totalAmt / noOfCx;
  amtCustomers.innerText = `$${costPerCx}`;
}

const increasePeople = () => {
  let cx = Number(noCx.innerText);
  cx++;
  noCx.innerText = cx;
  noOfCx = cx;
  calculateBill();
}

const decreasePeople = () => {
  let cx = Number(noCx.innerText);
  if (cx != 1) {
    cx--;
    noCx.innerText = cx;
    noOfCx = cx;
  }
  calculateBill();
}
