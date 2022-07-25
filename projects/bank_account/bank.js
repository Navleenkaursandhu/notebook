class Bank {
  constructor(balanceAmt, deposit, withdraw) {
    this.balanceAmt = balanceAmt
  }

  deposit(amount) {
    this.balanceAmt = this.balanceAmt + amount;
    return this.balanceAmt;
  }

  withdraw(amount) {
    if (this.balanceAmt <= 0) {
      return document.querySelector("#balance-amt").innerText = `Oops!, You cannot withdraw`;
    }
    else {
      return this.balanceAmt = this.balanceAmt - amount;
    }
  }
}

const array = [0, 1000, 2000, 34000, 2200, 2500, 5000, 1345, 2380, 50000, 75400];

const randomBalance = () => {
  var index = Math.floor(Math.random() * 10);
  return array[index];
}
const myAccount = new Bank(randomBalance());

document.querySelector("#balance-amt").innerText = `${myAccount.balanceAmt}`;

document.querySelector("#deposit-btn").onclick = () => {
  const amountDeposited = Number(document.querySelector("#deposit-amt").value);
  document.querySelector("#balance-amt").innerText = `${myAccount.deposit(amountDeposited)}`;
}

document.querySelector("#withdrawal-btn").onclick = () => {
  const amountWithdrawn = document.querySelector("#withdraw-amt").value;
  document.querySelector("#balance-amt").innerText = `${myAccount.withdraw(amountWithdrawn)}`;
}
