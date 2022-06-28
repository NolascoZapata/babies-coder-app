const randomNumber = () => Math.floor(Math.random()* 10);

const generateAccountNumber = (length = 15) => {
  let number = '';
  for (let i = 1; i <= length; i++) {
    number += randomNumber();
  }
  return number;
}

const generateAccount = () => {
  const newAccount = {
    number: generateAccountNumber(),
    owner: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return newAccount;
};

module.exports = {
  generateAccount,
}