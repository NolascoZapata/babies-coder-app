const express = require('express')
const router = express.Router()

const {
    getUserByEmailController,
    getUserController,
    updateUserController,
    deleteUserController} = require('./../../controllers/users.controller')

router.get('/',getUserController);
router.get('/:email',getUserByEmailController);
router.put('/:id',updateUserController);
router.delete('/:id',deleteUserController);


module.exports = router