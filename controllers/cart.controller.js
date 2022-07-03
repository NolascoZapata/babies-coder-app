
const { logger } = require('../log/logger')
const ProductsDao = require('../models/daos/Product.dao')
const CartDao = require('./../models/daos/Cart.dao')
const carts = new CartDao()
const products = new ProductsDao()


const getCartController = async (req,res,next)=>{
    try {
        const cartsAll = await carts.getAll()
        logger.log('info','[GET]==> Get Carts')
        res.json(cartsAll)
    } catch (error) {
        logger.log('error',error.message)
        next(error)
    }
}

const getCartByIdController = async(req,res,next)=>{
    let {params} = req.params
        try {
            const cart = await carts.getById(params)
            logger.log('info',`[GET]==> Get Cart with id '${params}'`)
            res.json(cart)
        } catch (error) {
            logger.log('error',error.message)
            next(error)
        }
}

const saveCartController = async (req,res,next)=>{
    try {
        const newCart = await carts.createCart(req.body)
        logger.log('info','[POST]==> Cart saved')
        res.json(newCart)
    } catch (error) {
        logger.log('error',error.message)
        next(error)
    }
}
const deleteCartController = async (req,res,next)=>{
    try {
        const {id} = req.params
        const deletedCart = await carts.model.deleteOne({_id:id})
        logger.log('info',`[DELETE]==> Cart with id ${id}`)
        res.json(deletedCart)
    } catch (error) {
        logger.log('error',error.message)
        next(error)
    }
}

const addItemCartController = async(req,res,next)=>{   
        const cart = req.session.cart;
        const product_id = req.params.id;
        await products.getById(product_id)
            .then(item => {
                if (item) {
                    const pos = cart.indexOf(cart.find(el=>el.id==product_id))
                    if (pos == -1) {
                        const data = {
                            id: item._id,
                            name: item.name,
                            quantity: 1,
                            price: item.price,
                            category: item.category,
                            size:item.size,
                            imgDir:item.imgDir,
                            subtotal: item.price
                        };
                        cart.push(data);
                    } else {
                        const data = cart[pos];
                        data.quantity = data.quantity + 1;
                        data.subtotal = data.price * data.quantity;
                        cart[pos] = data;
                    }
                    req.session.cart = cart;               
                    res.status(200).json(req.session.cart);
                } else {
                    res.status(500).json(`Can't add item to cart `);
                }
            }).catch(err => {
        res.status(500).json(err);
    });
    let cartId = req.user.cart
    let selectedCart = await carts.getById(cartId)
    let itemsCart = selectedCart.items
    itemsCart.push(cart);
    await carts.model.findByIdAndUpdate({_id:cartId},{items:itemsCart})
}
const deleteItemOnCartController = (req,res)=>{
        const cart = req.session.cart;
        const product_id = req.params.id;
        const pos = cart.indexOf(cart.find(el=>el.id==product_id))
        const data = cart[pos];
        if (data.quantity > 1) {
            data.quantity = data.quantity - 1;
            data.subtotal = data.quantity * data.price;
            cart[pos] = data;
            req.session.cart = cart;
            res.status(200).json(req.session.cart);
        } else {
            let aux=[]
            for(let i = 0; i < cart.length; i++) {
                let items = cart[i];
                if(items.id != product_id) {
                    aux.push(items);
                }
            }
            req.session.cart = aux;
            res.status(200).json(req.session.cart);
        }
        let cartId = req.user.cart
        let selectedCart = await carts.getById(cartId)
        let itemsCart = selectedCart.items
        itemsCart.push(cart);
        await carts.model.findByIdAndUpdate({_id:cartId},{items:itemsCart})
}

const getItems = (req, res)=>{
    res.status(200).json(req.session.cart);
}




module.exports = {
    getCartByIdController,
    getCartController,
    saveCartController,
    deleteCartController,
    carts,
    deleteItemOnCartController,
    getItems,
    addItemCartController,

}