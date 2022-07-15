const express = require('express')
const router = express.Router()

const {
  getOrderController,
  getOrderByEmailController,
  deleteOrderByIdController,
  addOrderController} = require('./../../controllers/order.controller')

router.get('/', getOrderController);
//router.get('/:email',getOrderByEmailController);
router.get('/addOrder',addOrderController);
router.delete('/deleteOrder/:id',deleteOrderByIdController);

module.exports = router