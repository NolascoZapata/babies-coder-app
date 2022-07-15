const express = require('express')
const router = express.Router()

const {
    getCartController,
    deleteCartController,
    deleteItemOnCartController,
    getItems,
    addItemCartController} = require('./../../controllers/cart.controller')

router.get('/', getCartController);
router.delete('/:id',deleteCartController);
router.get('/items',getItems);
router.get('/addItem/:id',addItemCartController);
router.get('/item/:id',deleteItemOnCartController);

module.exports = router