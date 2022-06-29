const express = require('express')
const router = express.Router()

const {
    getCartController,
    updateCartController,
    deleteCartController,
    saveCartController,
    getCartByParam} = require('./../../controllers/cart.controller')

router.get('/', getCartController);
router.get('/:params',getCartByParam);
router.post('/',saveCartController);
router.delete('/:id',deleteCartController);

module.exports = router