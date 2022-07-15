const express = require('express')
const router = express.Router()

const {
    getCartController,
    deleteCartController,
    saveCartController,
    getCartByIdController,
    deleteItemOnCartController,
    getItems,
    addItemCartController} = require('./../../controllers/cart.controller')

router.get('/', getCartController);
//router.get('/:id',getCartByIdController);
router.post('/',saveCartController);
router.delete('/:id',deleteCartController);
router.get('/items',getItems);
router.get('/addItem/:id',addItemCartController);
router.get('/item/:id',deleteItemOnCartController);

module.exports = router