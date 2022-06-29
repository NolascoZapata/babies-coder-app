const MongoDBContainer = require('../containers/Mongodb.container');
const CartSchema = require('../schemas/Cart.schema');

const collection = 'cart';

class CartsDao extends MongoDBContainer {
    static instance;
    constructor() {
        super(collection, CartSchema);
        if (!CartsDao.instance) {
            CartsDao.instance = this;
            return this;
        } else {
            return CartsDao.instance;
        }
    }
    async createCart(cartItem) {
        try {
            const cart = await this.createItem(cartItem);
            await cart.save()
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = CartsDao;