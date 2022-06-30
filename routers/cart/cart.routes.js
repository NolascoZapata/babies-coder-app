const express = require('express')
const router = express.Router()

const {
    getCartController,
    deleteCartController,
    saveCartController,
    getCartByIdController} = require('./../../controllers/cart.controller')

router.get('/', getCartController);
router.get('/:id',getCartByIdController);
router.post('/',saveCartController);
router.delete('/:id',deleteCartController);

module.exports = router