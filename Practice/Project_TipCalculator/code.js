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
  let customers = Number(numCustomersElement.innerText);
  customers++;
  numCustomersElement.innerText = customers;
  numberOfCustomers = customers;
  calculateBill();
}

const decreasePeople = () => {
  let customers = Number(numCustomersElement.innerText);
  if (customers != 1) {
    customers--;
    numCustomersElement.innerText = customers;
    numberOfCustomers = customers;
  }
  calculateBill();
}
