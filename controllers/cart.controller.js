
const CartDao = require('./../models/daos/Cart.dao')
const carts = new CartDao()

const getCartController = async (req,res,next)=>{
    try {
        const cartsAll = await carts.getAll()
        console.log('info','[GET]==> Get Carts')
        res.json(cartsAll)
    } catch (error) {
        console.log('error',error.message)
        next(error)
    }
}

const getCartByIdController = async(req,res,next)=>{
    let {params} = req.params
        try {
            const cart = await carts.getById(params)
            console.log('info',`[GET]==> Get Cart with id '${params}'`)
            res.json(cart)
        } catch (error) {
            console.log('error',error.message)
            next(error)
        }
}


const saveCartController = async (req,res,next)=>{
    try {
        const newCart = await carts.createCart(req.body)
        console.log('info','[POST]==> Cart saved')
        res.json(newCart)
    } catch (error) {
        console.log('error',error.message)
        next(error)
    }
}
const deleteCartController = async (req,res,next)=>{
    try {
        const {id} = req.params
        const deletedCart = await carts.model.deleteOne({_id:id})
        console.log('info',`[DELETE]==> Cart with id ${id}`)
        res.json(deletedCart)
    } catch (error) {
        console.log('error',error.message)
        next(error)
    }
}


module.exports = {
    getCartByIdController,
    getCartController,
    saveCartController,
    deleteCartController,
    carts
}