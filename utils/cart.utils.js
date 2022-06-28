const generateCart = () => {
  const newCart = {
    items: [],
    owner: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return newCart;
};

module.exports = { generateCart }