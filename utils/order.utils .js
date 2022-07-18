const randomNumber = () => Math.floor(Math.random()* 10);
const generateOrderNumber = (length = 15) => {
  let number = '';
  for (let i = 1; i <= length; i++) {
    number += randomNumber();
  }
  return number;
}
const generateOrder = () => {
  const newOrder = {
    owner_email: null,
    items:[],
    order_number: generateOrderNumber(),
    owner: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: null
    
  }
  return newOrder;
}

module.exports = { generateOrder }