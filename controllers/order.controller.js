const {
    logger
} = require("../log/logger");
const CartsDao = require("../models/daos/Cart.dao");
const OrderDao = require("../models/daos/Order.dao");
const Carts = new CartsDao();
const UsersDao = require("../models/daos/Users.dao");
const Users = new UsersDao();
const Orders = new OrderDao();



const getOrderController = async (req, res, next) => {
    try {
        const orders = await Orders.getAll()
        logger.log('info', '[GET]==> Get Orders')
        res.json(orders)
    } catch (error) {
        logger.log('error', error.message)
        next(error)
    }
}
const getOrderByEmailController = async (req, res, next) => {
    try {
        const email = req.params
        const orders = await Orders.getOrderUserByEmail(email);
        logger.log('info', '[GET]==> Get Orders By User Email');
        res.json(orders)
    } catch (error) {
        logger.log('error', error.message)
        next(error)
    }
}

const deleteOrderByIdController = async (req, res, next) => {
    try {
        const id = req.params.id
        let items = []
        let status = null
        let orderNum = 0
        const deletedOrder = await Orders.model.findByIdAndUpdate({ _id: id }, {items:items});
        await Orders.model.findByIdAndUpdate({ _id: id }, {status:status});
        await Orders.model.findByIdAndUpdate({ _id: id }, {order_number:orderNum});

        logger.log('info', `[DELETE]==> Order with id ${id}`)
        res.json(deletedOrder)
    } catch (error) {
        logger.log('error', error.message);
        next(error)
    }
}

const addOrderController = async (req, res, next) => {
    const cart = req.session.cart;
    const cartId = req.user.cart
    const orderId = req.user.orders
    
    const dbOrders = await Orders.getById(orderId)
    let orderStatus = dbOrders.status
    orderStatus = "generated"
    let orderNum = dbOrders.order_number
        ++orderNum
    let items = dbOrders.items;
    items = cart;
    await Orders.model.findByIdAndUpdate({_id: orderId}, {items: items})
    await Orders.model.findByIdAndUpdate({_id: orderId}, {order_number: orderNum})
    await Orders.model.findByIdAndUpdate({_id: orderId}, {status: orderStatus})
    req.session.cart = [];
    await Carts.model.findByIdAndUpdate({_id: cartId}, {items: req.session.cart})

    res.status(200).json(req.session.cart);
}


module.exports = {
    getOrderController,
    getOrderByEmailController,
    deleteOrderByIdController,
    addOrderController,
    Orders
}