const generateOrder = () => {
  const newOrder = {
    owner_email: null,
    items:[],
    order_number: 0,
    owner: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: null
    
  }
  return newOrder;
}

module.exports = { generateOrder }