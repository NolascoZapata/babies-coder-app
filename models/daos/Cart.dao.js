const { logger } = require('../../log/logger');
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
    async getCarts() {
        try {
            const carts = await this.getAll();
            return carts;
        } catch (error) {
            logger.log('error',error.message)
        }
    }
    async getCartById(id) {
        try {
            const cart = await this.getById(id);
            return cart;
        } catch (error) {
            logger.log('error',error.message)
        }
    }
    
    async addToCart(){
        
    }
};

module.exports = CartsDao;