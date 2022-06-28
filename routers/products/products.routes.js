const express = require('express')
const router = express.Router()

const {
    getProdController,
    updateProdController,
    deleteProdController,
    saveProdController,
    getProdByParam} = require('./../../controllers/products.controller')

router.get('/', getProdController);
router.get('/:params',getProdByParam);
router.post('/',saveProdController);
router.put('/:id',updateProdController);
router.delete('/:id',deleteProdController);

module.exports = router