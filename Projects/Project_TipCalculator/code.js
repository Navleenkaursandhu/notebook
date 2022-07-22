const costInput = document.querySelector("#input-cost");
const tipInput = document.querySelector("#input-tip-percent");

const numCustomersElement = document.querySelector("#customers-count");
const amountCustomersElement = document.querySelector("#customer-amt");

let numberOfCustomers = Number(numCustomersElement.innerText);
console.log(numberOfCustomers);

const calculateBill = () => {
  const billAmt = Number(costInput.value);
  const totalAmt = (Number(tipInput.value) * billAmt) / 100 + billAmt;
  const costPerCustomer = totalAmt / numberOfCustomers;
  amountCustomersElement.innerText = `$${costPerCustomer}`;
}

const increasePeople = () => {
  numberOfCustomers++;
  numCustomersElement.innerText = numberOfCustomers;
  calculateBill();
}

const decreasePeople = () => {
  if (numberOfCustomers != 1) {
    numberOfCustomers--;
    numCustomersElement.innerText = numberOfCustomers;
  }
  calculateBill();
}
