
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

const addItemCartController = async(req,res,bext)=>{    
        const cart = req.session.cart;
        const product_id = req.params;
        products.findOne({_id: product_id})
                .then(item => {
                    if (item) {
                        const pos = verif(cart, product_id);
                        if (pos == -1) {
                            const data = {
                                id: item.id,
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
                        console.log(req.session.cart);
                        res.status(200).json(req.session.cart);
                    } else {
                        res.status(500).json(`Can't add item to cart `);
                    }
                }).catch(err => {
            res.status(500).json(err);
        });
}
const deleteItemOnCartController = (req,res)=>{
        const cart = req.session.cart;
        const product_id = req.params;
        const pos = verif(cart, product_id);
        const data = cart[pos];
        if (data.quantity > 1) {
            data.quantity = data.quantity - 1;
            data.subtotal = data.quantity * data.price;
            cart[pos] = data;
            req.session.cart = cart;
            res.status(200).json(req.session.cart);
        } else {
            const aux = [];            
            for(const i = 0; i < cart.length; i++) {
                const items = cart[i];
                if(items.product_id != product_id) {
                    aux.push(items);
                }
            }
            req.session.cart = aux;
            res.status(200).json(req.session.cart);
        }
}
const verif = (list, product_id) => {
    const pos = -1;
    for (const i = 0; i < list.length; i++) {
        if (list[i].id == product_id) {
            pos = i;
            break;
        }
    }
    return pos;
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